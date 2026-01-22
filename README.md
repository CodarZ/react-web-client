<p align="center">
  <img src="./public/logo.svg" alt="React Web Client Logo" width="120" height="120" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Ant%20Design-6-0170FE?logo=antdesign&logoColor=white" alt="Ant Design" />
  <img src="https://img.shields.io/badge/Zustand-5-2D3748?logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/TanStack%20Router-FF4154?logo=reactrouter&logoColor=white" alt="TanStack Router" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=white" alt="Biome" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black" alt="Prettier" />
  <img src="https://img.shields.io/badge/lint--staged-3A33D1?logo=git&logoColor=white" alt="lint-staged" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Orval-FF6B6B?logo=swagger&logoColor=white" alt="Orval" />
  <img src="https://img.shields.io/badge/MSW-FF6A33?logo=mockserviceworker&logoColor=white" alt="MSW" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/Dev-Study-brightgreen" alt="Dev Study" />
</p>

## ✨ 技术栈 & 特性

- ⚡ **Vite 7** - 极速开发体验，闪电般的冷启动和热更新
- ⚛️ **React 19.2** - 最新版本，现代化用户界面构建
- 📘 **TypeScript** - 类型安全的开发体验
- 🎨 **Ant Design** - 开箱即用的企业级组件库
- 🔀 **TanStack Router** - 类型安全的路由解决方案
- 📦 **TanStack Query** - 强大的数据获取和缓存
- 🐻 **Zustand** - 轻量级状态管理
- 🌐 **Axios** - HTTP 请求客户端
- 🪝 **ahooks** - 高质量 React Hooks
- 🔧 **Radash** - 现代化工具函数库
- 📅 **Day.js** - 轻量级日期处理
- 🛡️ **Zod** - 运行时类型校验
- 🔄 **Orval** - 自动生成 API 客户端
- 🎭 **MSW** - API 模拟服务
- ✅ **Biome** - 快速的代码检查和格式化
- 💅 **Prettier** - 代码美化
- 🚫 **lint-staged** - Git hooks 代码检查

## 📁 项目结构

```bash
react-web-client/
├── 📂 .husky/                  # Git hooks 配置
├── 📂 .vscode/                 # VS Code 工作区配置
├── 📂 docs/
├── 📂 env/                     # 环境变量配置
├── 📂 public/
├── 📂 scripts/                 # 脚本
├── 📂 src/
│   ├── 📂 apis/
│   │   ├── 📂 contracts/       # API 契约
│   │   ├── 📂 generated/       # orval 自动生成的 API
│   │   ├── 📂 mock/            # Mock API
│   │   └── 📂 request/         # 封装 axios
│   ├── 📂 assets/
│   ├── 📂 components/          # 通用组件
│   ├── 📂 constants/           # 常量
│   ├── 📂 hooks/               # 自定义 Hooks
│   ├── 📂 layouts/             # 布局
│   ├── 📂 libs/                # 封装第三方库
│   ├── 📂 mocks/               # MSW Mock 服务
│   │   ├── 📂 modules/
│   │   └── 📂 utils/
│   ├── 📂 routes/              # 路由配置
│   │   ├── 📂 (auth)/
│   │   └── 📂 _authenticated/  # 需要认证的路由
│   ├── 📂 stores/              # Zustand 状态管理
│   ├── 📂 styles/              # 样式
│   ├── 📂 utils/               # 工具
│   ├── 📂 views/               # 页面视图
│   ├── 📄 App.tsx
│   └── 📄 main.tsx
├── 📂 types/                   # TypeScript 类型定义
├── 📄 .editorconfig
├── 📄 .prettierrc
├── 📄 .lintstagedrc.json       # lint-staged 配置
├── 📄 biome.json               # biome 配置
├── 📄 orval.config.ts          # Orval API 生成配置
└── 📄 vite.config.ts
```

## 🚀 快速开始

### 环境要求

- Node.js ≥ 22
- pnpm ≥ 10

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 生产构建

```bash
pnpm build
```

### 预览构建

```bash
pnpm preview
```

## 📝 开发规范

```bash
# 代码格式
pnpm format:check # 检查
pnpm format:fix # 修复

# 代码规范
pnpm lint:check # 检查
pnpm lint:fix # 修复
```

## 🔄 依赖升级

项目采用保守但及时的升级策略：

- ✅ **自动升级补丁版本** - bug 修复和安全补丁
- ✅ **自动升级次版本** - 新功能和改进，兼容性较好
- ❌ **不升级主版本** - 避免破坏性变更，保持项目稳定性

### 🚀 快速升级

每周或每两周执行一次完整检查：

```bash
# 1. 查看可升级的依赖
pnpm outdated

# 2. 升级所有兼容版本
pnpm update
```

### 升级验证

```bash
pnpm type:check    # TypeScript 类型检查
pnpm lint:check    # 代码规范检查
pnpm build         # 构建验证
pnpm dev           # 开发环境测试
```

### 安全和维护

```bash
pnpm audit --registry https://registry.npmjs.org # 安全审计（使用官方源）
pnpm prune # 清理项目中未使用的依赖包
pnpm store prune # 清理全局存储中的无引用包
```

<p align="center">
  <sub>Study and Built with ❤️ using modern web technologies</sub>
</p>
