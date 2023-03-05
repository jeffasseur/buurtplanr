This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Commands:
- `npm run dev` launch dev server.
- `npm run build` build next for production
- `npm run start` start NextJS with the production build
- `npm run lint` run ESLint and Stylelint`.
- `npm run lint-fix` run ESLint & Stylelint with `--fix`.
- `npm run lint:css` run Stylelint with `--fix`.
- `npm run typecheck` run tsc --noEmit.
- `npm run storybook` launch storybook dev server.
- `npm run build:storybook` build storybook for production.
- `npm run build:css-vars` build variables.css from the design tokens
- `npm run build:icons` Generate icons sprite from svg's

### 💎 PostCSS + postcss-preset-env
Use the regular CSS of tomorrow.

[`postcss-preset-env`](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) allows you to write CSS with future standards.

If you want to so see all the features head over https://preset-env.netlify.app/features/#stage-1.

Also check this video: https://www.youtube.com/watch?v=Ek1JP3BzbhY

### 🎨 Style-dictionary
Style-dictionary is a tool that allows you to generate CSS custom properties (CSS vars) from design tokens.

In a perfect world design token would be generated from the designer themselves then we would have to import the file and generate our properties from it.

So if you need to update your variables:
1. Go into `src/assets/styles/tokens`
2. Edit what you want or even add some values
3. Run `pnpm build:css-vars`

And voilà! You have a freshly generated `variales.css`.

If you want to know more about design token head over: https://amzn.github.io/style-dictionary/#/tokens

### 🗂 VS Code config
Under `.vscode` your will find multiples files:

- extensions — Recommended extensions for the project.
- settings.json — Settings for the project & recommended extensions.
- launch.json — Allows you to launch a debug session right in VS Code under the debug tab.
- typescriptreact.code-snippets — Define some useful react [snippets](#-vs-code-snippets)
- storybook.code-snippets — Define a useful storybook [snippets](#-vs-code-snippets)

### 🔥 VS Code Snippets
- React Snippets
  - `ir` — import React
  - `us` — useState
  - `uf` — useEffect
  - `ur` — useReducer
  - `urf` — useRef
  - `nc` — New React component
- Next Snippets
  - `np` — New NextJS Page
  - `napi` — New Next API endpoint
  - `gsp` — getStaticProps
  - `gssp` — getServerSideProps
  - `gspa` — GetStaticPaths
  - `imurtr` — Import useRouter
  - `imimg` — Import Next Image
  - `iml` — Import Next Link
- Wrap Snippets
  - `ff` — Wrap with React fragment
  - `wrap` — Wrap with Element/Component
  - `cx` — Wrap with clsx
- Storybook
  - `nsbc` — New Storybook component story

---

## Components Guidelines

### File Naming
Component files should be in `PascalCase.tsx`.

### Component Directory Structure

The component should use [atomic design philosophy](https://bradfrost.com/blog/post/atomic-web-design/).

The components directory as the following structure:
- atoms — Like a button
- molecules — Like a card
- organisms — Like a whole section
- blocks — Components that are only once per page like a header / footer / hero
- forms — Any form component form, inputs, group, etc.
- hoc — High Order Components
- layouts — Contains header / footer

### CSS Modules
Components should use CSS modules for their styles.

And should be put next to the `Component.tsx` file and should be named `styles.module.css`.

### 🧞 Icons with svg-sprite
[`svg-sprite`](https://github.com/svg-sprite/svg-sprite) is a tool that allows to generate a svg sprite from svg files.

Put your svg's in `src/assets/icons` and run `pnpm build:icons`.

All svg's within the folder will be in the newly generated sprite.

There is a pre-made `Icon` component under `src/components/atoms/Icon`.  
Use it with the name of the svg file you to display as the `name`prop.
```jsx
<Icon name='arrow-right' />


