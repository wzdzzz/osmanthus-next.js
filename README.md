# Web-Next.js

Web-Next.js is a template based on Next.js 14, providing a complete solution for developing projects with Next.js.

[中文文档](./README_zh.md)

## Features

- **Next.js 14**: Utilizes the latest App Router directory structure.
- **Tailwindcss**: Styled with Tailwindcss, Headless UI components from shadcn/ui, and Radix UI.
- **Next-Auth**: Controls login and authentication.
- **Next-Intl**: Supports multilingual configuration.
- **Next-Themes**: Configurable theme styles.
- **Zustand**: Manages global state.
- **Prisma**: Direct database integration.

## Getting Started

Follow these steps to get started with Web-Next.js.

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/wzdzzz/web-nextjs
cd web-next.js
```

2. **Install dependencies**:

```bash
yarn install
```

3. **Set up environment variables**:

```bash
cp .env.example .env.local
```

4. **Generate necessary files**:

```bash
yarn run generate
```

5. **Run the development server**:

```bash
yarn run dev
```

Your project should now be running on http://localhost:3000.

## Configuration

### Authentication

This template uses **Next-Auth** for authentication. Configure your authentication providers in src/config/auth.config.ts.

### Internationalization

**Next-Intl** is used for internationalization. Add your language files in the src/config/dictionaries directory.

### Theme Configuration

Customize themes using **Next-Themes** in src/app/globals.css.

### State Management

Global state is managed using **Zustand**. Define your stores in the src/store directory.

### Database Integration

**Prisma** is used for database integration. Configure your database connection in prisma/schema.prisma.

## License

This project is licensed under the MIT License.
