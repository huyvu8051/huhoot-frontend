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
		comboToken: "",
		combo: "",
		currCombo: "",
		pointsReceived: "",
		studentAnswered: 0,
		totalStudent: 0,
		totalStudentCorrect: 0,
		totalStudentWrong: 0,
		encryptedResponse: "",
		questionToken: null



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


		setTotalPoints(state, data) {
			state.totalPoints = data
		},
		setHashPointsReceived(state, data) {
			state.hashPointsReceived = data
		},
		setAnswerResultToken(state, data) {
			state.answerResultToken = data
		},
		setComboToken(state, data) {
			state.comboToken = data
		},
		setCombo(state, data) {
			state.combo = data
		},
		setEncryptedResponse(state, data) {
			state.encryptedResponse = data
		},


		//===========================

		publishExam(state, data) {
			state.studentAnswered = 0
			state.question = data.question
			state.answers = data.answers

			// student only
			state.hashCorrectAnswerIds = data.hashCorrectAnswerIds
			state.adminSocketId = data.adminSocketId
			state.questionToken = data.questionToken;

			// reset hash points received and key
			state.hashPointsReceived = ""
		},

		calculatePointReceived(state, data) {

			state.answers = data.answers;

			try {
				var result = JSON.parse(DecryptUtil.decrypt(state.encryptedResponse, data.encryptKey))
				state.pointsReceived = result.pointsReceived;
				state.currCombo = result.comboCount;

				state.totalPoints = parseFloat(state.totalPoints) + parseFloat(state.pointsReceived);
			} catch (error) {
				console.error(error)
				state.pointsReceived = null;
				state.currCombo = 0;
			}


			console.log("cal", state.pointsReceived, state.currCombo);




		},
		aStudentSubmitedAnswer(state) {
			state.studentAnswered++
		},
		showCorrectAnswer(state, data) {
			state.answers = data.answers
			state.totalStudent = data.totalStudent
			state.totalStudentCorrect = data.totalStudentCorrect
			state.totalStudentWrong = data.totalStudentWrong

			console.log(data);
		},
		saveStudentAnswerResponse(state, data) {
			state.comboToken = data.comboToken;
			state.encryptedResponse = data.encryptedResponse;
		}



	}
})