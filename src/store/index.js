import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    token: '', // 存储用户登录的 token
    userInfo: null, // 存储用户信息
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.token = '';
      state.userInfo = null;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  plugins: [createPersistedState()], // 使用 vuex-persistedstate 插件
});

export default store;
