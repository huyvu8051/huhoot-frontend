import Api from "@/services/Api";

export default {

    findAllStudent(params) {
        return Api().get("admin/student", {
            params: params
        });
    },

    updateStudent(data) {
        return Api().patch("admin/student", data);
    },
    addStudent(data) {
        return Api().post("admin/student", data);
    },




};
