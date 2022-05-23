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

		studentSubmited: false,
		correctAnswerIds: [],
		selectedAnswerIds: [],
		submitedAnswerIds: []


	},
	mutations: {
		pnq(state) {
			state.publishNextQuestion(state.challenge.id)
		},
		studentSubmited(state) {
			state.studentSubmited = true;
		},

		saveSubmitedAnswerIds(state, data) {
			state.submitedAnswerIds = data;
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


		//===========================

		publishExam(state, data) {
			state.studentAnswered = 0
			state.question = data.question
			state.answers = data.answers
			state.questionToken = data.questionToken;
			state.hashPointsReceived = ""


			state.studentSubmited = false
			state.correctAnswerIds = []
			state.selectedAnswerIds = []
			state.submitedAnswerIds = []
		},
		timeout(state) {
			state.question.timeout++;

			state.getCorrectAnswer(state.question.id)
		},

		calculatePointReceived(state, data) {

			try {
				var result = JSON.parse(DecryptUtil.decrypt(state.encryptedResponse, data.encryptKey))
				state.pointsReceived = result.pointsReceived;
				state.currCombo = result.comboCount;

				state.totalPoints = parseFloat(state.totalPoints) + parseFloat(state.pointsReceived);
			} catch (error) {
				state.pointsReceived = null;
				state.currCombo = 0;
			}

			switch (state.pointsReceived) {
				case null:
					Vue.swal({
						icon: "warning",
						title: "Timeout",
						text: "Better luck next time!",
						timer: 3000,
					});
					break;

				case 0:
					Vue.swal({
						icon: "error",
						title: "Oops...",
						text: "Incorrect answer!",
						timer: 3000,
					});
					break;

				default:
					Vue.swal({
						icon: "success",
						title: "Good job!",
						text:
							"Your answer is correct! \n Points received +" +
							parseInt(state.pointsReceived) +
							" combo: " +
							state.currCombo,
						timer: 3000,
					});
					break;
			}


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
		},
		enableAutoOrganize(state, data) {
			state.publishNextQuestion = AutoOrganizeService.publishNextQuestion
			state.getCorrectAnswer = AutoOrganizeService.showCorrectAnswer

			state.challenge = data.challenge
			state.question = data.question
			state.answers = data.answers
			state.questionToken = data.questionToken




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

		}


	}
})

export default store;