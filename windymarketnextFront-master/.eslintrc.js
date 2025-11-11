module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    /* 'plugin:cypress/recommended', */
    /* 'standard', */
    'eslint-config-prettier',
    /* 'plugin:sonarjs/recommended', */
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react' /* , 'sonarjs' */],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "import/no-unresolved": "error",
    "import/extensions": ["error", "ignorePackages", {
      "js": "never",
      "jsx": "never"
    }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    /* 'sonarjs/no-duplicate-string': 'off',
    'sonarjs/cognitive-complexity': 'warn', */
    'react/prop-types': 'off',
    indent: 'off',
    semi: ['error', 'always'],
    'max-len': [
      1,
      {
        code: 100,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      },
    ],
    camelcase: [
      'warn',
      {
        allow: [
          'id_intent',
          'response_json_new',
          'response_json_edit',
          'response_json_production',
          'examples_new',
          'examples_edit',
          'examples_production',
          'lateral_W',
          'id_number_list',
          'timestamp_update',
          'timestamp_create',
          'validation_test',
          'new_intent_preprocess',
          'corpus_area', // temporalmente, corpusArea....revisar i sustituir
          'corpus_name', // temporalmente, corpusName....revisar i sustituir si se puede
          'workspace_id', // cambiar por corpusAre
          'item_laterals',
          'image_lateral',
          'title_item_lateral',
          'first_name', // temporalmente,
          'last_name', // temporalmente
          'image_title',
          'title_link',
          'link_title',
          'title_item',
          'value_item',
          'items_list',
          'text_list',
          'title_list',
          'title_lateral',
          'item_lateral',
          'text_item_lateral',
          'document_lateral',
          'nowy_tooTip', // temporalmente
          'type_response', // temporalmente
          'previous_sibling', // temporalmente
          'id_node',
          'idResponse_node',
          'dialog_node', // temporalmente
          'dcentro_id', // temporalmente
          'dcentro_name', // temporalmente
          'workspace_name', // temporalmente
          'id_list', // temporalmente
          'output_text', // temporalmente
          'id_skill_tst',
          'id_skill_pro',
          'jsonskill_test',
          'jsonskill_production',
          'assistantId_tst',
          'assistantId_pro',
          'responses_asoc', // temporalmente
          'response_json', // temporalmente
          'button_pressed',
          'initial_messages', // temporalmente
          /* 'items_listFiltered',  */ // temporalmente
          /* 'revertLateral_W', */ // temporalmente
          'purchase_units',
          'currency_code',
          'payment_method',
          'billing_details',
          'return_url',
          'poblacion_CP',
          'client_id'
        ],
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: true,
      },
    ],
    'no-var': 'error',
    'dot-notation': 'warn',
    'array-callback-return': 'warn',
    'prefer-promise-reject-errors': 'warn',
  },
};
