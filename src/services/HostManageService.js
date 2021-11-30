import Api from "@/services/Api";

export default {


  findAllAnswer(params) {
    return Api().get("host/answer", {
      params: params
    });
  },
  updateAnswer(data) {
    return Api().patch("host/answer", data);
  },
  addAnswer(data) {
    return Api().post("host/answer", data);
  },

  findAllQuestion(params) {
    return Api().get("host/question", {
      params: params
    });
  },
  updateQuestion(data) {
    return Api().patch("host/question", data);
  },
  addQuestion(data) {
    return Api().post("host/question", data);
  },

  findAllChallenge(params) {
    return Api().get("host/challenge", {
      params: params
    });
  },
  updateChallenge(data) {
    return Api().patch("host/challenge", data);
  },

  addChallenge(data) {
    return Api().post("host/challenge", data);
  },


  upload(data) {
    return Api().post("host/upload", data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },

  findAllStudentInChallenge(params) {
    return Api().get("host/studentChallenge", {
      params: params
    });

  }
};
