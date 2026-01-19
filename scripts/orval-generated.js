#!/usr/bin/env node
/**
 * 扫描 endpoints 目录下的所有子目录，生成一个`index.ts`导出文件
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedDir = path.resolve(__dirname, '../src/apis/generated');
const apisIndex = path.resolve(__dirname, '../src/apis/index.ts');

/** 扫描 generated 目录下, 获取服务目录 */
function getServices() {
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
    console.log(`[scripts orval] ➡️  创建 generated 空目录`);
  }
  return fs
    .readdirSync(generatedDir, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory()) return false;

      const endpointsDir = path.join(generatedDir, entry.name, 'endpoints');

      try {
        return fs.statSync(endpointsDir).isDirectory();
      } catch {
        return false;
      }
    })
    .map((entry) => entry.name);
}

/** 生成 index.ts */
function generateEndpointsIndex(name) {
  const endpointsDir = path.join(generatedDir, name, 'endpoints');

  /** endpoints 下所有子目录 */
  const entries = fs.readdirSync(endpointsDir, { withFileTypes: true });

  /** 子目录名字列表 */
  const subdirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  // 生成导出语句
  const subdirExport = subdirs
    .map((dir) => {
      // 检查目录下是否有同名的主文件
      const mainFile = path.join(endpointsDir, dir, `${dir}.ts`);
      if (fs.existsSync(mainFile)) {
        return `export * from './${dir}/${dir}';`;
      }

      return null;
    })
    .filter(Boolean)
    .join('\n');

  const content = `${subdirExport}\n`;
  const indexPath = path.join(endpointsDir, 'index.ts');
  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log(`[scripts orval] ${name} 导出了 ${subdirs.length} 个模块: ${subdirs.join(', ')}`);
}

/** 更新 `src/apis/index.ts` */
function updateApisIndex(services) {
  // 校验存在性
  if (!fs.existsSync(apisIndex)) {
    const template = `/** API 模块入口 */

// 导出请求模块
// export * from './request';

// 导出手动定义的 contracts
// export * from './contracts';

// 导出手写的 mock API
// export * from './mock';

/** 以下导出由脚本自动生成，请勿手动修改 */

// [AUTO-GENERATED-EXPORTS]
// [AUTO-GENERATED-EXPORTS-END]
`;
    fs.writeFileSync(apisIndex, template, 'utf-8');
    console.log(`[scripts orval] ➡️  生成 apis/index.ts 入口文件`);
  }

  // 生成导出语句（导出 endpoints 和 schemas）
  const block = services
    .flatMap((_) => [`export * from './generated/${_}/endpoints';`, `export * from './generated/${_}/schemas';`])
    .join('\n');

  // 读取文件并替换标记区域的内容
  const indexContent = fs.readFileSync(apisIndex, 'utf-8');
  const updatedContent = indexContent.replace(
    /\/\/ \[AUTO-GENERATED-EXPORTS\]([\s\S]*?)\/\/ \[AUTO-GENERATED-EXPORTS-END\]/,
    `// [AUTO-GENERATED-EXPORTS]\n${block}\n// [AUTO-GENERATED-EXPORTS-END]`,
  );

  fs.writeFileSync(apisIndex, updatedContent, 'utf-8');
  console.log(`[scripts orval] ✅ 已更新 apis/index.ts, 导出 ${services.length} 个服务`);
}

function main() {
  const services = getServices();
  if (!services.length) return;
  for (const service of services) {
    generateEndpointsIndex(service);
  }
  updateApisIndex(services);
}

main();
