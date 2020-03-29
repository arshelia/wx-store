/*
 * @Descripttion:
 * @version:
 * @Author: shelia
 * @Date: 2020-03-25 14:45:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-29 00:38:45
 */
import Observer from "./observer";
import {type} from './utils';
const bindWatcher = Symbol('bindWatcher');
const unbindWatcher = Symbol('unbindWatcher');
var storeId = 0;
class Store{
  constructor({state, actions, mutations}){
    this.storeId = storeId++;
    // 数据存储
    this.state = state;
    // 异步操作
    this.actions = actions;
    // 同步操作
    this.mutations = mutations;
    // 监听器（发布/订阅者）
    this.events = new Observer();
    // store状态
    this.status = "default";
    // target
    this.target = null;

    /* this.state = new Proxy(state, {
      set: function(target, key, value, receiver){
        console.log(target);
        if(target[key] === value) return;
        if(this.status === "default"){
          console.log(`只允许通过dispatch或commit修改数据`);
        } else {
          this.status = "default";
        }
        Reflect.set(target, propKey, value, receiver);
        // notify
        console.log(`====设置了${key}，新的值为${value}===`);
      }
    }) */
  }
  commit(mutationKey, payload){
    if(type(this.mutations[mutationKey]) !== "function"){
      console.log(`mutation "${mutationKey}" must be a function`);
      return false;
    }
    this.status = "mutation";
    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
    // 这里update收集到的数据
    return true;
  }
  dispatch(actionKey, payload){
    if(type(this.actions[actionKey]) !== "function"){
      console.log(`action "${actionKey}" must be a function`);
      return false;
    }
    this.status = "action";
    this.actions[actionKey](this, payload);
    return true;
  }
}

function createPage(page, stores){
  if(!page.data){
    page.data = {};
  }
  if(type(stores) !== null && type(stores) !== "object"){
    return console.error(`stores must be Object`);
  }
  for(let key in stores){
    const store = stores[key];
    if(!(store instanceof Store)){
      return console.error(`store must be instace of Store`);
    }
    page.data[key] = store.state;
  }
  const onLoad = page.onLoad;
  const onUnLoad = page.onUnLoad;
  page.onLoad = function(options){
    onLoad && onLoad.apply(this, options);
  }
  page.onUnLoad = function(options){
    for(let key in Object.keys(stores)){
      const store = stores[key];
      for(let eventKey in Object(store.events)){
        const eventName = store.events[store];
        console.log(eventName);
      }
    }
    onUnLoad && onUnLoad.apply(this, options);
  }
  return page;
}

function createComponent(component, stores){
  if(!component.data){
    component.data = {};
  }
  if(type(stores) !== null || type(stores) !== "object"){
    console.log(`stores must be Object`);
  }
  for(let key in Object.keys(stores)){
    const store = stores[key];
    if(!(store instanceof Store)){
      console.log(`store must be instace of Store`);
    }
    store.watchers.push(this);
    component.data[key] = store;
  }
  const attached = component.lifetimes.attached || component.attached;
  const detached = component.detached;
  component.lifetimes.attached = function(options){
    attached && attached.apply(this, options);
  }
  component.lifetimes.detached = function(options){
    detached && detached.apply(this, options);
  }
  return component;
}

module.exports = {
  Store,
  createPage,
  createComponent
}
