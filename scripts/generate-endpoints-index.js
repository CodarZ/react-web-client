#!/usr/bin/env node
/**
 * 自动生成 endpoints/index.ts
 * 扫描 endpoints 目录下的所有子目录，生成统一导出文件
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 自动扫描 generated 目录获取所有服务
const generatedDir = path.resolve(__dirname, '../src/apis/generated');

function getServices() {
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
    console.log(`[generate-endpoints-index] 已创建 generated 目录: ${generatedDir}`);
  }
  return fs
    .readdirSync(generatedDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function generateEndpointsIndex(serviceName) {
  const endpointsDir = path.resolve(__dirname, `../src/apis/generated/${serviceName}/endpoints`);

  if (!fs.existsSync(endpointsDir)) {
    console.log(`[generate-endpoints-index] 目录不存在: ${endpointsDir}`);
    return;
  }

  // 读取所有子目录
  const entries = fs.readdirSync(endpointsDir, { withFileTypes: true });
  const subdirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (subdirs.length === 0) {
    console.log(`[generate-endpoints-index] ${serviceName}: 没有找到端点目录`);
    return;
  }

  // 生成导出语句
  const exports = subdirs
    .map((dir) => {
      // 检查目录下是否有同名的主文件（排除 .msw.ts）
      const mainFile = path.join(endpointsDir, dir, `${dir}.ts`);
      if (fs.existsSync(mainFile)) {
        return `export * from './${dir}/${dir}';`;
      }
      // 如果没有同名文件，尝试导出整个目录（如果有 index.ts）
      const indexFile = path.join(endpointsDir, dir, 'index.ts');
      if (fs.existsSync(indexFile)) {
        return `export * from './${dir}';`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n');

  const content = `${exports}\n`;
  const indexPath = path.join(endpointsDir, 'index.ts');

  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log(`[generate-endpoints-index] ✅ ${serviceName}: 已生成 ${indexPath}`);
  console.log(`[generate-endpoints-index]    导出了 ${subdirs.length} 个模块: ${subdirs.join(', ')}`);
}

/**
 * 更新 src/apis/index.ts，自动添加所有服务的 endpoints 导出
 */
function updateApisIndex(services) {
  const apisIndexPath = path.resolve(__dirname, '../src/apis/index.ts');

  // 如果文件不存在，创建一个基础模板
  if (!fs.existsSync(apisIndexPath)) {
    const template = `/**
 * APIs 模块入口
 */

// 导出请求模块
export * from './request';

// 导出手动定义的契约
export * from './contracts';

// [AUTO-GENERATED-EXPORTS] 以下导出由脚本自动生成，请勿手动修改
`;
    fs.writeFileSync(apisIndexPath, template, 'utf-8');
    console.log(`[generate-endpoints-index] 已创建 ${apisIndexPath}`);
  }

  let content = fs.readFileSync(apisIndexPath, 'utf-8');

  // 生成导出语句（同时导出 endpoints 和 models）
  const exportsBlock = services
    .flatMap((service) => [
      `export * from './generated/${service}/endpoints';`,
      `export * from './generated/${service}/models';\n`,
    ])
    .join('\n');

  // 标记区域
  const startMarker = '// [AUTO-GENERATED-EXPORTS-START]';
  const endMarker = '// [AUTO-GENERATED-EXPORTS-END]';
  const newBlock = `${startMarker}\n${exportsBlock}\n${endMarker}`;

  // 检查是否已有自动生成区域
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    // 替换现有区域
    content = content.slice(0, startIndex) + newBlock + content.slice(endIndex + endMarker.length);
  } else {
    // 添加到文件末尾
    content = `${content.trimEnd()}\n\n${newBlock}\n`;
  }

  fs.writeFileSync(apisIndexPath, content, 'utf-8');
  console.log(`[generate-endpoints-index] ✅ 已更新 ${apisIndexPath}`);
  console.log(`[generate-endpoints-index]    导出了 ${services.length} 个服务: ${services.join(', ')}`);
}

// 执行
const services = getServices();
if (services.length === 0) {
  console.log('[generate-endpoints-index] 未找到任何服务目录');
} else {
  for (const service of services) {
    generateEndpointsIndex(service);
  }
  // 更新 apis/index.ts
  updateApisIndex(services);
}
