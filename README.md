# coffeelint-reporter-style-for-eslint-formatter
An ESLint formatter in style of CoffeeLint default reporter

## Installation
`npm install coffeelint-reporter-style-for-eslint-formatter`

## Usage
Run:
```
node_modules\.bin\eslint --format ./node_modules/coffeelint-reporter-style-for-eslint-formatter/main.js .
```

Or add script in your `package.json`:
```json
  "scripts": {
    "lint": "eslint --format ./node_modules/coffeelint-reporter-style-for-eslint-formatter/main.js ."
  }
```
