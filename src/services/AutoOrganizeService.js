import Api from "@/services/Api";
import store from '@/store/store'

var publishNextQuestion = (challengeId) => {
    console.log("auto publishNextQuestion");
    return Api().get("autoOrganize/publishNextQuestion", {
        params: {
            challengeId: challengeId
        }
    })
}
var showCorrectAnswer = (questionId) => {
    console.log("auto showCorrectAnswer");
    return Api().get("autoOrganize/showCorrectAnswer", {
        params: {
            questionId: questionId
        }
    })
}
var enableAutoOrganize = (challengeId) => {
    return Api().get("autoOrganize/enableAutoOrganize", {
        params: {
            challengeId: challengeId
        }
    })
}
var disableAutoOrganize = (challengeId) => {
    return Api().get("autoOrganize/disableAutoOrganize", {
        params: {
            challengeId: challengeId
        }
    })
}



export default {
    publishNextQuestion,
    showCorrectAnswer,
    enableAutoOrganize,
    disableAutoOrganize,
   

};