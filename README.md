# jsemolik/ui

Reusable UI components for Next.js projects, powered by shadcn/ui primitives.
Install components directly into your project via a lightweight CLI.

---

## ✨ What this is

`jsemolik-ui` is a CLI that copies prebuilt React components from this repository into your Next.js project.

Components are written with **shadcn/ui**, Tailwind, and TypeScript.

When you add a component, it is placed into:

```
components/<name>.tsx
```

inside your project.

---

## 🚀 Usage

You can run the CLI without installing anything globally.

Using npm / pnpm / yarn / bun:

```
npx github:jsemolik/ui <command>
pnpm dlx github:jsemolik/ui <command>
yarn dlx github:jsemolik/ui <command>
bunx github:jsemolik/ui <command>
```

> Requires Bun installed (CLI runtime)

---

## 📦 Commands

### List available components

```
npx github:jsemolik/ui list
```

Example output:

```
Available components:

  • navbar
  • footer
  • hero

Total: 3
```

---

### Add a component

```
npx github:jsemolik/ui add <name>
```

Example:

```
npx github:jsemolik/ui add navbar
```

Result:

```
components/navbar.tsx
```

is created in your project.

---

### Add multiple components

```
npx github:jsemolik/ui add navbar footer
```

---

## 🧱 Requirements

Your project should:

* use Next.js
* use Tailwind CSS
* have shadcn installed
* have a `components/` directory in the project root
  (created automatically if missing)

---

## 🗂 Component Source

All components live in this repository:

```
/components
```

Each file:

```
components/<name>.tsx
```

becomes:

```
<your-project>/components/<name>.tsx
```

---

## 🛠 Development

Add a new component:

```
components/my-component.tsx
```

Open a pull request. Once merged, it will automatically appear in:

```
npx github:jsemolik/ui list
```

No registry or config needed.

---

## 📜 License

GNU General Public License v3.0
See [`COPYING`](./COPYING)
