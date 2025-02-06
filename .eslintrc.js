module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "no-unused-vars": "warn", // 사용하지 않는 변수는 warning
    "@typescript-eslint/no-unused-vars": "warn", // TypeScript에서도 warning
    "vue/script-setup-uses-vars": "error", // script setup에서 선언된 변수가 사용되지 않으면 오류
  },
};
