import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/Api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
      id: '',
      parent_id: '',
      title: '',
      color: '',
      start: '',
      end: '',
      days: []
    },
    events: []
  },
  mutations: {
    setEVents (state, events) {
      state.events = events.data
    },
  },
  actions: {
    fetchEvents ({commit}) {
      return api.get('/api/event/list').then((res) => {
        commit('setEVents', res.data)
      })
    },
  }
})
