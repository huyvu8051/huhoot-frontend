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
		roles: null,
		hashCorrectAnswerIds: "",
		question: null,
		answers: null,
		adminSocketId: "",
		totalPoint: 0

	},
	mutations: {
		setToken(state, data) {
			state.token = data
		},
		setUsername(state, data) {
			state.username = data
		},
		setFullName(state, data) {
			state.fullName = data
		},
		setRoles(state, data) {
			state.roles = data
		},
		setHashCorrectAnswerIds(state, data) {
			state.hashCorrectAnswerIds = data
		},
		setQuestion(state, data) {
			state.question = data
		},
		setAnswers(state, data) {
			state.answers = data
		},
		setAdminSocketId(state, data) {
			state.adminSocketId = data
		},
		setTotalPoint(state, data) {
			state.totalPoint = data
		}
	},
	actions: {
		setToken({ commit }, data) {
			commit('setToken', data)
		},
		setUsername({ commit }, data) {
			commit('setUsername', data)
		},
		setFullName({ commit }, data) {
			commit('setFullName', data)
		},
		setRoles({ commit }, data) {
			commit('setRoles', data)
		},
		setHashCorrectAnswerIds({ commit }, data) {
			commit('setHashCorrectAnswerIds', data)
		},
		setQuestion({ commit }, data) {
			commit('setQuestion', data)
		},
		setAnswers({ commit }, data) {
			commit('setAnswers', data)
		},
		setAdminSocketId({ commit }, data) {
			commit('setAdminSocketId', data)
		},
		setTotalPoint({ commit }, data) {
			commit('setTotalPoint', data)
		},
	}
})