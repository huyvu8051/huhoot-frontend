import Api from "@/services/Api";

export default {

    getStudentDetails(data) {
        return Api().post("/details/student",data);
    },
    getAdminDetails(body) {
        return Api().post("/details/admin", body);
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