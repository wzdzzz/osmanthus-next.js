# Web-Next.js

Web-Next.js 是一款基于 Next.js 14 的模板，为使用 Next.js 开发项目提供了完整的解决方案。

[English Docs](./README.md)

## 功能特性

- **Next.js 14**: 使用最新的 App Router 目录结构。
- **Tailwindcss**: 使用 Tailwindcss 样式，包含 shadcn/ui 和 Radix UI 的无头组件。
- **Next-Auth**: 控制登录和认证。
- **Next-Intl**: 支持多语言配置。
- **Next-Themes**: 配置主题风格。
- **Zustand**: 管理全局状态。
- **Prisma**: 直接对接数据库。

## 开始使用

按照以下步骤开始使用 Web-Next.js。

### 安装

1. **克隆仓库**:

```bash
git clone https://github.com/wzdzzz/web-nextjs
cd web-next.js
```

2. **安装依赖**:

```bash
yarn install
```

3. **设置环境变量**:

```bash
cp .env.example .env.local
```

4. **生成必要的文件**:

```bash
yarn run generate
```

5. **运行开发服务器**:

```bash
yarn run dev
```

您的项目现在应该运行在 http://localhost:3000。

## 配置

### 认证

此模板使用 **Next-Auth** 进行认证。在 src/config/auth.config.ts 中配置您的认证提供程序。

### 多语言支持

**Next-Intl** 用于多语言支持。在 src/config/dictionaries 目录中添加您的语言文件。

### 主题配置

使用 **Next-Themes** 在 src/app/globals.css 中自定义主题。

### 状态管理

全局状态由 **Zustand** 管理。在 src/store 目录中定义您的存储。

### 数据库集成

使用 **Prisma** 进行数据库集成。在 prisma/schema.prisma 中配置您的数据库连接。

## 许可证

本项目使用 MIT 许可证。
