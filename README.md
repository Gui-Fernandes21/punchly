# Punchly

Punchly is a **micro-SaaS admin/dashboard starter** built with **Nuxt 4**, **PrimeVue**, and **Tailwind CSS**. It provides a lightweight, opinionated layout (auth + default), UI components, and theming to help you ship internal tooling or B2B dashboards quickly.

---

## 🚀 Features

- **Nuxt 4**: Modern app directory structure (`app/`) for routing and layouts
- **PrimeVue**: Component-rich UI elements
- **Tailwind CSS**: Utility-first and custom styling
- Pre-configured layouts: `auth` and `default`
- Centralized theming with brand colors and shades

---

## 🛠️ Quick Start

### Prerequisites

- **Node.js 18+** (or compatible LTS)
- **pnpm** (preferred) — install with:

```bash
npm i -g pnpm
```

### Installation

Install dependencies:

```bash
pnpm install
```

### Local Development

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` (or the port shown in the terminal).

### Build for Production

Build and preview:

```bash
pnpm build
pnpm preview
```

### Linting & Formatting

Run linters and formatters:

```bash
pnpm lint
pnpm format
```

---

## 📂 Project Structure

- `app/` - Nuxt app directory
  - `pages/` - Route pages (e.g., `login`, `otp`)
  - `layouts/` - `auth` and `default` layout files
  - `components/` - UI components and layout pieces
  - `assets/` - Fonts, CSS, and SCSS files
  - `composables/` - Composable utilities (e.g., `useLayout.js`)
- `public/` - Static assets like images and favicon
- `nuxt.config.ts` - Nuxt configuration

To add new routes, create files under `app/pages/`. For example, `app/pages/dashboard/index.vue` creates the `/dashboard` route.

---

## 🎨 Theming and Brand Color

Brand colors are centralized in `app/theme.ts` for PrimeVue and Tailwind configuration. The primary brand color is `#14ABB7` with predefined shades. Update `app/theme.ts` to tweak colors or add new palettes.

---

## 🔐 Environment & Secrets

Use `.env` files for environment variables (e.g., `.env`, `.env.local`). Example:

```env
API_BASE_URL=https://api.example.com
PUBLIC_FEATURE_FLAG=true
```

---

## 🧩 Adding Pages / Navigation

1. Create a new page file under `app/pages/` (e.g., `app/pages/reports/index.vue`).
2. Add a navigation entry to your sidebar/menu component (`components/App/Menu.vue`).

Nuxt's filesystem-based routing automatically generates routes from file paths.

---

## 🛠️ Development Notes

- If navigation only works for `/login`, ensure pages exist under `app/pages/`.
- Register third-party UI packages (PrimeVue plugins, custom directives) in `nuxt.config.ts` or a plugin file.

---

## 🧪 Tests

This starter does not include a test harness by default. Recommended next steps:

- Add unit tests with **Vitest** or **Jest**
- Add end-to-end tests with **Playwright** or **Cypress**

---

## 🤝 Contribution

Contributions are welcome! Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Open a pull request with a clear description

Please follow existing code style and run linters before opening PRs.

---

## 📜 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

## 📬 Contact

For questions or customization help, open an issue or contact the maintainer.
