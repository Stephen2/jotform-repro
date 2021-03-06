// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [ "merit/backend" ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  }
};