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
    setEvents (state, events) {
      state.events = events.data
    },
    setEventForm (state, form) {
      state.form = form
    }
  },
  actions: {
    fetchEvents ({commit}) {
      return api.get('/api/event/list').then((res) => {
        commit('setEvents', res.data)
      })
    },
    createEvent ({commit}, payload) {
      return api.post('/api/event/create', payload).then((res) => {
        commit('setEventForm', res.data)
      })
    }
  }
})
