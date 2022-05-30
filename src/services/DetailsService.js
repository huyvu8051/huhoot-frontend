import Api from "@/services/Api";

export default {

    getStudentDetails(username) {
        return Api().get("/details/student", {
            params: {
                username: username
            }
        });
    },
    getAllChallengeParticipateIn(body) {
        return Api().post("/details/student/challenge-participate-in", body);
    },
    getAllParticipants(body) {
        return Api().post("/details/participants", body);
    },
    getChallengeReports(params) {
        return Api().get("/details/challenge-report", {
            params: params
        });
    },
}