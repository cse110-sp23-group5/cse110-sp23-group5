# CI/CD Pipeline Setup

1. EsLint

To install ESLint, run the following commands in the root of the project directory:

`npm init -y`

`npm install eslint --save-dev`

`./node_modules/.bin/eslint --init`

In the config file, under rules, you should set "camelcase":"error"
Or, just paste this into the config file: 
```
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "camelcase":"error"
    }
}
```

2. Code Climate

This is automatically integrated with GitHub.

3. Unit and End-to-End Tests

Unit and E2E tests are run automatically when code is pushed to GitHub. To set up Jest and Puppeteer locally, run:
```
npm install --save-dev jest babel-jest @babel/core @babel/preset-env puppeteer jest-puppeteer jest-environment-jsdom
```

Use `npm run test` to run tests.

4. JSDocs

In VSCode, to generate the JSDoc for a function, type `/**` above a function and use the auto generated fill-in.