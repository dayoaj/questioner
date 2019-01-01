module.exports = {
  env: {
    mocha: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier", "mocha"],
  rules: {
    "no-console": "off",
    "prettier/prettier": ["error"],
    "mocha/no-exclusive-tests": "error"
  }
};
