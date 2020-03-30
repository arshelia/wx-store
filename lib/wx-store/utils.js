/*
 * @Author: shelia
 * @Date: 2020-03-26 14:42:31
 * @LastEditTime: 2020-03-28 18:34:46
 * @LastEditors: Please set LastEditors
 * @Description: 工具函数
 * @FilePath: /wx-store/lib/wx-store/utils.js
 */

const class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error"
  .split(" ")
  .map(function (item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
  });

export function type(obj) {
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[Object.prototype.toString.call(obj)] || "object"
    : typeof obj;
}
