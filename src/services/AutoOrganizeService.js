import Api from "@/services/Api";
import store from '@/store/store'

var publishNextQuestion = (challengeId) => {
    return Api().get("autoOrganize/publishNextQuestion", {
        params: {
            challengeId: challengeId
        }
    })
}
var showCorrectAnswer = (questionId) => {
    return Api().get("autoOrganize/showCorrectAnswer", {
        params: {
            questionId: questionId
        }
    })
}



export default {
    publishNextQuestion,
    showCorrectAnswer,
    autoPublishNextQuestion(challengeId) {
        setTimeout(() => {
            publishNextQuestion(challengeId)


        }, 5000);
    },
    autoShowCorrectAnswer(questionId) {
        var question = store.state.question;

        if (question !== null) {
            var time = question.askDate + question.answerTimeLimit * 1000;

            var interval = setInterval(() => {
                var currTime = new Date().getTime();

                console.log(currTime, time);

                if (currTime >= time) {

                    showCorrectAnswer(questionId);
                    clearInterval(interval);
                }
            }, 200)
        }


    }
};