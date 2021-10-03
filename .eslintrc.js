module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "extends": "plugin:react/recommended",
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        //Eslint rulesで検索
        "indent": [
          "error",
          2,
          { "switchCase": 1 }
        ],
        "quotes": [
          "error",
          "double"
        ],
        "semi": [
          "error",
          "always"
        ],
        //使っていない変数がある場合エラーにする
        "no-unused-vars": [
            "error",
            {
              "vars": "all",
              "args": "none"
            }
        ],
        "no-console": [
            "off"
        ]
    }
};
