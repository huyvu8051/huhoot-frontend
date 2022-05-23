import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import AutoOrganizeService from "@/services/AutoOrganizeService";
import DecryptUtil from "@/services/DecryptUtil";
import AnswerColorSchemes from "@/services/AnswerColorSchemes";

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

		correctAnswerIds: [],
		studentSubmited: false,
		selectedAnswerIds: [],


	},
	mutations: {
		studentSubmited(state) {
			state.studentSubmited = true;
		},

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
			state.questionToken = data.questionToken;
			state.hashPointsReceived = ""


			state.correctAnswerIds = []
			state.studentSubmited = false
			state.selectedAnswerIds = []
		},
		disableSubmit(state) {
			state.notSubmitable = true;
		},

		calculatePointReceived(state, data) {

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

			console.log("show correct answer");
			state.totalStudent = data.totalStudent
			state.totalStudentCorrect = data.totalStudentCorrect
			state.totalStudentWrong = data.totalStudentWrong
			state.correctAnswerIds = data.answers
			if (state.question) {
				state.question.timeout = data.timeout
			}


		},
		saveStudentAnswerResponse(state, data) {
			state.comboToken = data.comboToken;
			state.encryptedResponse = data.encryptedResponse;
		},

		saveChallengeData(state, data) {


			state.challenge = data.challenge;
			state.question = data.question
			state.answers = data.answers

			// if (state.question && state.question.timeout) {
			// 	state.notSubmitable = state.question.timeout < new Date().getTime();
			// }


		},
		checkCorrectAnswers(state) {
			if (state.answers && state.correctAnswerIds) {
				var r = state.answers.map(e => {
					e.isCorrect = state.correctAnswerIds.includes(e.id)
					return e;
				});

				state.answers = r;
			}
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

		},
		disableAutoOrganize(state) {
			state.publishNextQuestion = (challengeId) => console.log("disable auto next", challengeId)
			state.getCorrectAnswer = (questionId) => console.log("disable auto show", questionId)


		},
		selectAnswer(state, item) {

			if (state.selectedAnswerIds.includes(item.id)) {
				state.selectedAnswerIds = state.selectedAnswerIds.filter(e => e !== item.id);
			} else {
				state.selectedAnswerIds.push(item.id);
			}


			console.log(state.selectedAnswerIds);



			// if (state.answers) {
			// 	var r = state.answers.map(e => {
			// 		if (e.id === item.id) {
			// 			e.selected = !item.selected;
			// 		}
			// 		return e;
			// 	});
			// 	state.answers = r;
			// }
		}


	}
})

export default store;