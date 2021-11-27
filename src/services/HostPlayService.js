import Api from "@/services/Api";

export default {
    openChallenge(params) {
        return Api().get("host/openChallenge", {
            params: params
        });
    },
    getStudentsOnline(params) {
        return Api().get("host/studentOnline", {
            params: params
        });
    },
    publishQuestion(params){
        return Api().get("host/publishQuestion",{
            params: params
        })
    },
    showCorrectAnswer(params){
        return Api().get("host/showCorrectAnswer",{
            params: params
        })
    },



};
