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
    /*
    this.$router
      .push({
        name: "student.wait",
        query: {
          challengeId: this.$route.query.challengeId,
        },
      })
      .catch((err) => err);
      */
  },
  beforeDestroy() {
    this.removeSocketListener(this.socket);
  },
  methods: {
    connectSocket() {
      var socket = io.connect(this.$socketUrl);

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
        this.$error("Cann't connect to room!!!");

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
        this.$store.commit("publishExam", data);

        this.$router
          .push({
            name: "student.ready",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.$store.state.question.id,
            },
          })
          .catch((err) => err);
      });

      // =============== show correct answer =================
      socket.on("showCorrectAnswer", (data) => {
        this.$store.commit("calculatePointReceived", data);

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
        this.$error("You're out!!!");
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