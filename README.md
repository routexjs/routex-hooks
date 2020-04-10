# Routex Hooks [![npm](https://img.shields.io/npm/v/@routex/hooks.svg)](https://www.npmjs.com/package/@routex/hooks) [![Travis CI](https://img.shields.io/travis/com/routexjs/routex-hooks.svg)](https://travis-ci.com/routexjs/routex-hooks) [![Codecov](https://img.shields.io/codecov/c/github/routexjs/routex-hooks.svg)](https://codecov.io/gh/routexjs/routex-hooks)

Hooks for [Routex](https://www.npmjs.com/package/routex).

[Documentation](https://routex.js.org/docs/packages/hooks) - [GitHub](https://github.com/routexjs/routex-hooks)

## Example

Install:

```bash
yarn add @routex/hooks
# or
npm add @routex/hooks
```

Setup your app:

```js
const { Routex, TextBody } = require("routex");
const { hooksHandler, useGetParam, useSetBody } = require("@routex/hooks");

const port = process.env.PORT || 3000;
const app = new Routex();

app.get(
  "/:name",
  hooksHandler(() => {
    const name = useGetParam("name");

    useSetBody(new TextBody(name));
  })
);

app.listen(port).then(() => console.log(`Listening on ${port}`));
```

## Support

We support all currently active and maintained [Node LTS versions](https://github.com/nodejs/Release),
include current Node versions.

Please file feature requests and bugs at the [issue tracker](https://github.com/routexjs/routex-hooks/issues).
