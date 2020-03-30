/*
 * @Author: your name
 * @Date: 2020-03-28 18:32:48
 * @LastEditTime: 2020-03-31 01:47:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wx-store/store/user.js
 */
import { Store } from "../lib/wx-store/index";
import { type } from "../lib/wx-store/utils";

const userStore = new Store({
  state: {
    userinfo: {},
    hobbies: ["food", "sports"],
  },
  mutations: {
    DeleteHobby(state, index) {
      state.hobbies.splice(index, 1);
    },
    AddHobby(state, hobby) {
      if (type(hobby) !== "array") {
        state.hobbies.push(hobby);
      } else {
        state.hobbies = this.state.hobbies.concat(hobby);
      }
    },
    setUserinfo(state, userinfo) {
      state.userinfo = userinfo;
    },
  },
  actions: {
    getUserInfo() {
      const that = arguments[0];
      setTimeout(() => {
        console.log("===fake异步获取数据===");
        const data = {
          nickname: "shelia",
          city: "shenzhen",
        };
        that.commit("setUserinfo", data);
      }, 2000);
    },
  },
});

export default userStore;
