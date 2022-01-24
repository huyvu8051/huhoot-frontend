<template>
  <v-main>
    <Header />
    <FlexLayout>
      <router-view
        :socket="socket"
        :question="question"
        :answers="answers"
        :theLastQuestion="question.theLastQuestion"
      />
    </FlexLayout>
  </v-main>
</template>

<script>
import Header from "@/components/participate/ChallengeHeader";
import FlexLayout from "@/components/FlexLayout";

import io from "socket.io-client";
import DecryptUtil from "@/services/DecryptUtil";

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
          console.log("registerSuccess", data);
          this.$store.dispatch("setTotalPoints", data.totalPoints);

          this.$eventBus.$emit("updateTotalPoints");
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

        this.$store.dispatch(
          "setHashCorrectAnswerIds",
          data.hashCorrectAnswerIds
        );
        this.$store.dispatch("setQuestion", data.question);
        this.$store.dispatch("setAnswers", data.answers);
        this.$store.dispatch("setAdminSocketId", data.adminSocketId);

        // reset hash points received and key
        this.$store.dispatch("setHashPointsReceived", "");
        this.$store.dispatch("setEncryptKey", "");

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

      // =============== show correct answer =================
      socket.on("showCorrectAnswer", (data) => {
        // decrypt points received
        var pointsReceived = DecryptUtil.encryptResponse(
          this.$store.state.hashPointsReceived,
          data.encryptKey
        );

        // recalculate total points
        var totalPoints = this.$store.state.totalPoints;
        totalPoints = parseFloat(totalPoints) + parseFloat(pointsReceived);

        this.$store.dispatch("setAnswers", data.answers);
        this.$store.dispatch("setPointsReceived", pointsReceived);
        this.$store.dispatch("setTotalPoints", totalPoints);
        this.$eventBus.$emit("updateTotalPoints");

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
      this.$eventBus.$off("storeEncrypted");
    },
  },
};
</script>

<style>
</style>