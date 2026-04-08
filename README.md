# Vendorzo

POS

## ☁️ Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/EastrixLabs/Vendorzo)
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/EastrixLabs/Vendorzo)

## ✨ Features (Subjected to be Changed)

- **Interactive Portfolio** — Showcase your work, projects, and professional accomplishments in an engaging way.
- **Responsive Design** — Optimized for all devices, from mobile to desktop.
- **Dark/Light Mode** — Seamless theme switching with user preference persistence.
- **Search Functionality** — Quickly find projects and work experiences with a built-in search bar.
- **Command Component** — Open a keyboard-driven command dialog for faster project discovery and navigation.
- **Content Collections** — Easily manage and update projects and work experiences using Markdown files.
- **Article Sharing** — Share article pages through a native share sheet, social platforms, and copyable links.
- **Fast Performance** — Built with Astro for lightning-fast static site generation.
- **Accessible UI** — Components from Shadcn UI ensure a11y compliance and great UX.
- **Open Source** — MIT licensed; customize and deploy your own version freely.

## 🧱 Tech Stack (Subjected to be Changed)

- [Astro](https://astro.build/): Modern static site generator for building fast, content-focused websites.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Shadcn UI](https://ui.shadcn.com/): Re-usable components built using Radix UI and Tailwind CSS.
- [TypeScript](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript.
- [Biome](https://biomejs.dev/): Fast linter, formatter, and more for JavaScript, TypeScript, and JSON.
- [Content Collections](https://docs.astro.build/en/guides/content-collections/): Astro's built-in content management system for type-safe Markdown and MDX.


## 🚀 Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/astro-portfolio.git
cd astro-portfolio
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the app.

## 📦 Build for Production

```bash
bun run build
bun start
```

## 🗂️ Configuration (Subjected to be Changed)

The editor is componentized under `src/components`. Key areas to customize are:

```text
src/                        # Source directory for the Astro project
  layouts/                  # Astro layout components for structuring pages
  pages/                    # Page routes and endpoints
    index.astro             # Homepage
    projects/               # Projects listing and individual project pages
    work/                   # Work experiences listing
  content/                  # Content collections for dynamic content
    config.ts               # Content collection configuration
    projects/               # Markdown files for projects
    work/                   # Markdown files for work experiences
public/                     # Static assets served directly
  icons/                    # Favicon and app icons
  js/                       # Client-side JavaScript files
    theme.js                # Theme switching logic
    drawer.js               # Mobile drawer functionality
    animate.js              # Animation scripts
```

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out [Contributing.md](Contributing) to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

## ⚖️ License

This project is released under the Unlicensed License, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the [Unlicensed](LICENSE) file.
