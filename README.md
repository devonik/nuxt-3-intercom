# Nuxt intercom

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This nuxt 3 module provides a client side plugin that add intercom to window and provides $intercom instance so you can easily access intercom function like update user properties

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-intercom?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Nuxt 3 Ready
- 🚠 &nbsp;As lightweight as possible
- 🌲 &nbsp;Written in Typescript
- ⛰ &nbsp;Simple configuration

## Quick Setup

1. Add `nuxt-intercom` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-intercom

# Using yarn
yarn add --dev nuxt-intercom

# Using npm
npm install --save-dev nuxt-intercom
```

2. Add `nuxt-intercom` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-intercom'
  ],
  intercom: {
    // Required
    appId: process.env.INTERCOM_APP_ID
  }
})
```

That's it! You can now use intercom in your Nuxt app ✨

## Plugin

This module provides a client side plugin. You can call the Intercom instance via $intercom
Note: If you want to access the plugin in script you have to import it first via

```js
const { $intercom } = useNuxtApp()
```

See /playground for more

TODO .... Here should be a list with all methods provided by the Intercom instance

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-intercom/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-intercom

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-intercom.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-intercom

[license-src]: https://img.shields.io/npm/l/nuxt-intercom.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-intercom

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
