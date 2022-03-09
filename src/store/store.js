import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	modules: {

	},
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
		totalPoints: 0,
		hashPointsReceived: "",
		pointsReceived: "",
		studentAnswered: 0,



	},
	mutations: {
		setToken(state, data) {
			state.token = data
		},
		setUsername(state, data) {
			state.username = data
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
		setTotalPoints(state, data) {
			state.totalPoints = data
		},
		setHashPointsReceived(state, data) {
			state.hashPointsReceived = data
		},

		setPointsReceived(state, data) {
			state.pointsReceived = data
		},

		//===========================

		publishExam(state, data) {
			state.studentAnswered = 0;
			state.question = data.question;
			state.answers = data.answers;
		},
		aStudentSubmitedAnswer(state) {
			state.studentAnswered++;
		},

	}
})