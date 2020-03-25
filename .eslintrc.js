/*
 * @Descripttion: 
 * @version: 
 * @Author: shelia
 * @Date: 2020-03-25 14:39:29
 * @LastEditors: shelia
 * @LastEditTime: 2020-03-25 14:39:32
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: [
    "prettier"
  ],
  extends: [
    "prettier",
    "prettier/standard"
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier":"error",
    "no-console": 0,
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false
  }
}