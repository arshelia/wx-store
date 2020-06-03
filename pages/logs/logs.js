/*
 * @Author: your name
 * @Date: 2020-03-26 00:10:23
 * @LastEditTime: 2020-06-03 23:50:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wx-store/pages/logs/logs.js
 */
//logs.js
const util = require("../../utils/util.js");
import { createPage } from "../../lib/wx-store/index";
import userStore from "../../store/user";
Page(
  createPage(
    {
      data: {
        logs: [],
      },
      onLoad: function () {
        this.setData({
          logs: (wx.getStorageSync("logs") || []).map((log) => {
            return util.formatTime(new Date(log));
          }),
        });
      },
      handleDelete(event) {
        console.log(event);
        const index = event.currentTarget.dataset.index;
        console.log(`====删除${index}===`);
        userStore.commit("DeleteHobby", index);
      },
      handleAdd() {
        console.log("add操作");
        userStore.commit("AddHobby", "reading");
      },
    },
    {
      userStore,
    }
  )
);
