<template>
  <v-main>
    <Header :point="totalPoint" />
    <FlexLayout>
      <router-view
        :socket="socket"
        :question="question"
        :answers="answers"
        :isCorrectEncrypt="isCorrectEncrypt"
        :totalPointEncrypt="totalPointEncrypt"
        :encryptKey="encryptKey"
        :theLastQuestion="question.theLastQuestion"
      />
    </FlexLayout>
  </v-main>
</template>

<script>
import Header from "@/components/participate/ChallengeHeader";
import StudentPlayService from "@/services/StudentPlayService";
import FlexLayout from "@/components/FlexLayout";

import io from "socket.io-client";
export default {
  components: {
    Header,
    FlexLayout,
  },
  data() {
    return {
      socket: {},
      question: {},
      answers: [],
      answerStatistics: [],
      isCorrectEncrypt: "",
      totalPointEncrypt: "",
      encryptKey: "",
      totalPoint: "0",
      challenge: {}
    };
  },
  created() {
    var challengeId = this.$route.query.challengeId;

    this.joinRoom(challengeId);

    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
  },
  beforeDestroy() {
    this.removeEventBusListener();
    this.removeSocketListener(this.socket);
  },
  methods: {
    joinRoom(challengeId) {
      this.$router
        .push({
          name: "student.wait",
          query: {
            challengeId: challengeId,
          },
        })
        .catch((err) => err);
    },

    connectSocket() {
      const socketUrl = this.$socketUrl;
      var socket = io.connect(socketUrl);
      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("clientConnectRequest", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        })
        .on("registerSuccess", (data) => {
          console.log(data);
          this.challenge = data;
        });

      socket.on("joinError", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Cann't connect to room!!!",
          status: "error",
        });
        this.$router
          .push({
            name: "STUDENT",
          })
          .catch((err) => err);
      });

      return socket;
    },
    registerEvent(socket) {
      socket.on("startChallenge", () => {
        this.$router
          .push({
            name: "student.start",
            query: {
              challengeId: this.$route.query.challengeId,
            },
          })
          .catch((err) => err);
      });

      socket.on("publishQuestion", (data) => {
        this.question = data.question;
        this.answers = data.answers;

        this.isCorrectEncrypt = "";
        this.totalPointEncrypt = "";
        this.encryptKey = "";

        this.$router
          .push({
            name: "student.ready",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.question.id,
            },
          })
          .catch((err) => err);
      });

      socket.on("showCorrectAnswer", (data) => {
        this.answers = data.answers;

        // console.log("show correct answer", data);

        this.encryptKey = data.encryptKey;

        this.$router
          .push({
            name: "student.show",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.$route.query.questionId,
            },
          })
          .catch((err) => err);
      });

      socket.on("endChallenge", () => {
        this.$router
          .push({
            name: "student.finish",
            query: {
              challengeId: this.$route.query.challengeId,
            },
          })
          .catch((err) => err);
      });

      socket.on("kickStudent", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "You're out!!!",
          status: "error",
        });
        this.$router
          .push({
            name: "STUDENT",
          })
          .catch((err) => err);
      });

      this.$eventBus.$on(
        "setTotalPoint",
        (totalPoint) => (this.totalPoint = totalPoint)
      );
      this.$eventBus.$on("storeEncrypted", ({ isCorrect, totalPoint }) => {
        this.isCorrectEncrypt = isCorrect;
        this.totalPointEncrypt = totalPoint;
        console.log("store", this.isCorrectEncrypt, this.totalPointEncrypt);
      });
    },
    removeSocketListener(socket) {
      socket.off("connected");
      socket.off("registerSuccess");
      socket.off("joinError");
      socket.off("startChallenge");
      socket.off("publishQuestion");
      socket.off("showCorrectAnswer");
      socket.off("endChallenge");
      socket.off("kickStudent");
    },
    removeEventBusListener() {
      this.$eventBus.$off("sentAnswer");
      this.$eventBus.$off("setTotalPoint");
    },
  },
};
</script>

<style>
</style>