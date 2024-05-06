---
title: Bundlers
description: Using bundlers for defining environment variables
sidebarDepth: 0
---

# Bundlers

In order to load environment variables and make them available for your application's runtime, e.g. from an `.env` file,
you are required to use other tools, such as [dotenv](https://github.com/motdotla/dotenv) and a JavaScript module bundler.

[[TOC]]

## DotEnv

The [dotenv](https://github.com/motdotla/dotenv) packages is able to read environment variables that are defined in a
file, and parse them either into node's [`process.env.`](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)
or a custom object.

The following example shows a general approach on how to read the contents of a `.env` file and parse it into an object,
which can then be exposed to your application's runtime, by your module bundler.

```js
const fs = require('node:fs');
const dotEnv = require('dotenv');

// use dotEnv to parse contents of .env file into an object...
const ENV = dotEnv.parse(
    fs.readFileSync('.env', 'utf8')
);
```

## Webpack

For [Webpack](https://webpack.js.org/), you can use [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) to
replace variables (_or tokens_) in your code at compile time.
The following example shows how to read the contents of a `.env` file, parse it into an object and "inject" it into a
`__ENV__` variable, which will be made available in your runtime.

```js
// In your webpack.config.js
const fs = require('node:fs');
const dotEnv = require('dotenv');
const webpack = require('webpack');

const ENV = dotEnv.parse(
    fs.readFileSync('.env', 'utf8')
);

module.exports = {
    plugins: [
        // The __ENV__ variable will be replaced with the
        // parsed .env object...
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(ENV)
        })
    ],

    module: {
        rules: [
            // ...not shown...
        ],
    },
};
```

## Rollup

You can use the [replace](https://github.com/rollup/plugins/tree/master/packages/replace) plugin for [Rollup](https://rollupjs.org/)
to "inject" an object in your runtime, with the contents of a `.env` file. 

```js
// In your rollup.config.js
import replace from '@rollup/plugin-replace';
const fs = require('node:fs');
const dotEnv = require('dotenv');

const ENV = dotEnv.parse(
    fs.readFileSync('.env', 'utf8')
);

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'es'
  },
  plugins: [
    replace({
        __ENV__: JSON.stringify(ENV)
    })
  ]
};
```

## Esbuild

In your [esbuild's](https://esbuild.github.io/) configuration file, your can use the [`define`](https://esbuild.github.io/api/#define)
setting to "inject" the parsed contents of your `.env` file, into your runtime.

```js
const esbuild = require('esbuild');
const fs = require('node:fs');
const dotEnv = require('dotenv');

const ENV = dotEnv.parse(
    fs.readFileSync('.env', 'utf8')
);

esbuild
    .build({
        define: {
            __ENV__: JSON.stringify(ENV),
        }
        // ...other configuraiton not shown
    })
    .then(() => console.log('⚡Bundle build complete ⚡'))
    .catch(() => {
        process.exit(1);
    });
```

## Other Bundlers

::: tip Help Wanted
There are many more JavaScript module bundlers than covered here.
If you are using a bundler that is not covered by this guide, then you are welcome to help improve this guide.
See the [contribution guide](../../../contribution-guide.md) for additional details.
:::