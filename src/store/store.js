import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import AutoOrganizeService from "@/services/AutoOrganizeService";
import DecryptUtil from "@/services/DecryptUtil";

import router from "@/router"

Vue.use(Vuex)

var store = new Vuex.Store({
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
		challenge: null,
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
		questionToken: null,
		publishNextQuestion: (challengeId) => { console.log("disable auto next", challengeId) },
		getCorrectAnswer: (questionId) => { console.log("disable auto show", questionId) },



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

			state.questionToken = data.questionToken;

			// reset hash points received and key
			state.hashPointsReceived = ""

			// var question = state.question;
			// var now = new Date().getTime();
			// var timeout = (question.askDate + question.answerTimeLimit * 1000) - now;

			// setTimeout(() => {
			// 	state.getCorrectAnswer(question.id)
			// }, timeout);

		},

		calculatePointReceived(state, data) {
			// setTimeout(() => {
			// 	state.publishNextQuestion(state.question.challengeId)
			// }, 5000);

			state.answers = data.answers;

			try {
				var result = JSON.parse(DecryptUtil.decrypt(state.encryptedResponse, data.encryptKey))
				state.pointsReceived = result.pointsReceived;
				state.currCombo = result.comboCount;

				state.totalPoints = parseFloat(state.totalPoints) + parseFloat(state.pointsReceived);
			} catch (error) {
				// console.error(error)
				state.pointsReceived = null;
				state.currCombo = 0;
			}


			// console.log("cal", state.pointsReceived, state.currCombo);
		},
		showCorrectAnswer(state, data) {
			// setTimeout(() => {
			// 	state.publishNextQuestion(state.question.challengeId)
			// }, 5000);

			state.answers = data.answers
			state.totalStudent = data.totalStudent
			state.totalStudentCorrect = data.totalStudentCorrect
			state.totalStudentWrong = data.totalStudentWrong

		},
		saveStudentAnswerResponse(state, data) {
			state.comboToken = data.comboToken;
			state.encryptedResponse = data.encryptedResponse;
		},

		organizeJoinSuccess(state, data) {
			console.log(data);

			state.challenge = data.challenge;
			state.question = data.question
			state.answers = data.answers
		},
		enableAutoOrganize(state, data) {
			state.publishNextQuestion = AutoOrganizeService.publishNextQuestion
			state.getCorrectAnswer = AutoOrganizeService.showCorrectAnswer

console.log(data);
			state.challenge = data.challenge
			state.question = data.question
			state.answers = data.answers
			state.questionToken = data.questionToken

			if (state.question) {
				var now = new Date().getTime();
				var atl = (state.question.askDate + state.question.answerTimeLimit * 1000);

				if (now >= atl) {
					state.getCorrectAnswer(state.question.id);
					// setTimeout(() => {
					// 	state.getCorrectAnswer(state.question.id);
					// }, 2000);

				}
			} else {
				state.publishNextQuestion(state.challenge.id)
			}

			// var now = new Date().getTime();
			// var timeout = data - now;
			// setTimeout(() => {

			// 	state.publishNextQuestion(state.question.challengeId)
			// }, timeout);
		},
		disableAutoOrganize(state) {
			state.publishNextQuestion = (challengeId) => console.log("disable auto next", challengeId)
			state.getCorrectAnswer = (questionId) => console.log("disable auto show", questionId)
			// var question = state.question;
			// var now = new Date().getTime();
			// var timeout = (question.askDate + question.answerTimeLimit * 1000) - now;

			// setTimeout(() => {
			// 	state.getCorrectAnswer = (questionId) => console.log("disable auto show", questionId)
			// }, timeout + 1000);

		},


	}
})

export default store;