const base = require('./src/rule-base.js');
const onecode = require('./src/rule-onecode.js');

module.exports = {
    'extends': [
        // "eslint:recommended", 这里很多规则和 @typescript-eslint 是重复的所以弃用。因为我们很多规则必须禁用，要么得写两遍
    ],
    'rules': {
        ...base.rules,
        ...onecode.rules,
        // onecode-tongxinlinghang 自定义规则
        "no-undef": "off",
        "semi": ["error", "always"],
        "vue/html-indent": ["error", 2, {
          "attribute": 1,
          "closeBracket": 0,
          "alignAttributesVertically": false
        }],
        "vue/max-attributes-per-line": [
          "error",
          {
            "singleline": {
              "max": 2
            },
            "multiline": {
              "max": 1
            }
          }
        ],
        "vue/html-closing-bracket-newline": [
          "error",
          {
            "singleline": "never",
            "multiline": "always"
          }
        ],
        "eqeqeq": ["error", "always"],
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/ban-ts-comment": "off",
        "max-lines-per-function": ["warn", {
          "max": 80,
          "skipBlankLines": true,
          "skipComments": true,
          "IIFEs": true
        }],
        "@typescript-eslint/comma-dangle": [
          "error",
          {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "only-multiline",
            "enums": "always-multiline",
            "tuples": "only-multiline",
            "generics": "only-multiline"
          }
        ],
        "@typescript-eslint/quotes": [
          "error",
          "single",
          {
            "avoidEscape": false,
            "allowTemplateLiterals": true
          }
        ],
        "max-len": [
          "error",
          {
            "code": 100,
            "tabWidth": 2,
            "ignoreUrls": true,
            "ignoreComments": false,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreRegExpLiterals": true
          }
        ],
        "prettier/prettier": "off"
    },
    overrides: [...onecode.overrides],
};
