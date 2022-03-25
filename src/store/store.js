import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import DecryptUtil from "@/services/DecryptUtil";

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
	
		
		setAnswers(state, data) {
			state.answers = data
		},
	
		setTotalPoints(state, data) {
			state.totalPoints = data
		},
		setHashPointsReceived(state, data) {
			state.hashPointsReceived = data
		},

		
		//===========================

		publishExam(state, data) {
			state.studentAnswered = 0
			state.question = data.question
			state.answers = data.answers

			// student only
			state.hashCorrectAnswerIds = data.hashCorrectAnswerIds
			state.adminSocketId = data.adminSocketId

			// reset hash points received and key
			state.hashPointsReceived = ""
		},

		calculatePointReceived(state, data) {
			state.answers = data.answers;
			
			// decrypt points received
			var pointsReceived = DecryptUtil.encryptResponse(
				state.hashPointsReceived,
				data.encryptKey
			);
			state.pointsReceived = pointsReceived;


			// recalculate total points
			var totalPoints = state.totalPoints;
			console.log("calculate points", totalPoints, pointsReceived);
			totalPoints = parseFloat(totalPoints) + parseFloat(pointsReceived);
			state.totalPoints = totalPoints;
		},
		aStudentSubmitedAnswer(state) {
			state.studentAnswered++
		},

	}
})