---
description: How to install Vuepress Utils
sidebarDepth: 0
---

# How to install

## npm

```bash:no-line-numbers
npm install --save-dev @aedart/vuepress-utils
```

::: warning Troubleshooting

At the time of this writing, [`"vuepress": "^2.0.0-beta.61"`](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md) was specified as this package's [peer dependency](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#peerdependencies).
A [known bug](https://github.com/vuejs/vuepress/issues/3096#issuecomment-1482660870) might prevent correct installation, when using npm. 
To overcome this issue, please use a fixed version of vuepress and its related packages: 

```json
{
    "devDependencies": {
        "@aedart/vuepress-utils": "^0.1.1",
        "vuepress": "2.0.0-beta.61",
        "@vuepress/core": "2.0.0-beta.61",
        "@vuepress/utils": "2.0.0-beta.61",
        "@vuepress/client": "2.0.0-beta.61"
    }   
}
```
:::

## yarn

```bash:no-line-numbers
yarn add --dev @aedart/vuepress-utils
```

## pnpm

```bash:no-line-numbers
pnpm add --save-dev @aedart/vuepress-utils
```