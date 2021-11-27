import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	plugins: [
		createPersistedState()
	],
	state: {
		token: null,
		username: null,
		fullName: null,
		roles: null
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setUsername(state, username) {
			state.username = username
		},
		setFullName(state, fullName) {
			state.fullName = fullName
		},
		setRoles(state, roles) {
			state.roles = roles
		}
	},
	actions: {
		setToken({ commit }, token) {
			commit('setToken', token)
		},
		setUsername({ commit }, username) {
			commit('setUsername', username)
		},
		setFullName({ commit }, fullName) {
			commit('setFullName', fullName)
		},
		setRoles({ commit }, roles) {
			commit('setRoles', roles)
		}
	}
})