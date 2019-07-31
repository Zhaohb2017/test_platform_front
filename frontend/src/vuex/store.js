import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key = 'user'
const store = new Vuex.Store({
  // 设置属性
  state: {
    user: localStorage.getItem(key),
  },

  // 获取属性的状态
  getters: {
    //获取登录状态
    getStorage: function(state){
      if (!state.user){
        state.user = localStorage.getItem(key)
      }
    }
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    $_setStorage(state, value){
      state.user = value
      localStorage.setItem(key, value)
    },

    $_removeStorage(state){
      state.user = null
      localStorage.removeItem(key)
    }
  },

  actions: {
    setUser({commit}, value) {
      commit("user", value)
    },
  }

})

export default store