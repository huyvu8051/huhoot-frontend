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
    addManyStudent(data) {
        return Api().post("admin/manyStudent", data);
    },


    findAllHost(params) {
        return Api().get("admin/host", {
            params: params
        });
    },
    addHost(data) {
        return Api().post("admin/host", data);
    },
    updateHost(data) {
        return Api().patch("admin/host", data);
    },




};
