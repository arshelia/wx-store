/*
 * @Descripttion:
 * @version:
 * @Author: shelia
 * @Date: 2020-03-25 14:18:08
 * @LastEditors: shelia
 * @LastEditTime: 2020-03-25 14:44:10
 */
const events = Symbol("events");
class Observer {
  constructor() {
    this[events] = {};
  }
  on(eventName, callback) {
    this[events][eventName] = this[events][eventName] || [];
    this[events][eventName].push(callback);
  }
  emit(eventName) {
    const callbacks = this[events][eventName] || [];
    const args = [].prototype.slice.call(arguments, 1);
    callbacks.forEach((callback) => {
      callback.apply(this, arguments);
    });
  }
  off(eventName, callback) {
    const callbacks = this[events][eventName] || [];
    callbacks.forEach((cb, index) => {
      if (cb === callback) {
        this.callbacks.splice(index, 1);
      }
    });
  }
  clear(eventName) {
    this[events][eventName] = [];
  }
  one(eventName, callback) {
    this.off(eventName, callback);
    this.on(eventName, callback);
  }
}
const observer = new Observer();
export default {
  Observer,
  observer,
};
