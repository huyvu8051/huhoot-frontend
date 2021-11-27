import Api from "@/services/Api";

export default {
  findAllChallenge(params) {
    return Api().get("host/challenge",{
        params: params
    });
  }
};
