// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    data_transaction: [] // Initial empty array
  },
  getters: {
    // Getters can be added here if needed
  },
  mutations: {
    // Mutation to append data to the array
    APPEND_TRANSACTION(state, payload) {
      state.data_transaction.push(payload);
    }
  },
  actions: {
    // Action to commit the mutation
    appendTransaction({ commit }, payload) {
      commit('APPEND_TRANSACTION', payload);
    }
  },
  modules: {
    // Modules can be added here if needed
  }
})
