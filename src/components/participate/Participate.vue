<template>
  <v-main>
    <Header />
    <h-flex-layout>
      <router-view />
    </h-flex-layout>
  </v-main>
</template>

<script>
import Header from "@/components/participate/ChallengeHeader";

import io from "socket.io-client";
import DecryptUtil from "@/services/DecryptUtil";

export default {
  components: {
    Header,
  },
  data() {
    return {
      socket: null,
    };
  },
  created() {
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
    this.$router
      .push({
        name: "student.wait",
        query: {
          challengeId: this.$route.query.challengeId,
        },
      })
      .catch((err) => err);
  },
  beforeDestroy() {
    this.removeSocketListener(this.socket);
  },
  methods: {
    connectSocket() {
      const socketUrl = this.$socketUrl;
      var socket = io.connect(socketUrl);

      socket
        .on("connected", () => null)
        .emit("clientConnectRequest", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        })
        .on("registerSuccess", (data) => {
          console.log("connect success!", data);
          this.$store.commit("setTotalPoints", data.totalPoints);
          this.$eventBus.$emit("connected", socket);
        });

      socket.on("joinError", () => {
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

        this.$store.commit(
          "setHashCorrectAnswerIds",
          data.hashCorrectAnswerIds
        );
        this.$store.commit("setQuestion", data.question);
        this.$store.commit("setAnswers", data.answers);
        this.$store.commit("setAdminSocketId", data.adminSocketId);

        // reset hash points received and key
        this.$store.commit("setHashPointsReceived", "");

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

        console.log("calculate points", totalPoints, pointsReceived);

        totalPoints = parseFloat(totalPoints) + parseFloat(pointsReceived);

        this.$store.commit("setAnswers", data.answers);
        this.$store.commit("setPointsReceived", pointsReceived);
        this.$store.commit("setTotalPoints", totalPoints);
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
  },
};
</script>

<style>
</style>