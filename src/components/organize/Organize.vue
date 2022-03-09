<template>
  <v-main>
    <h-flex-layout>
      <router-view :studentAnswered="studentAnswered" :ready="ready" />
    </h-flex-layout>
  </v-main>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      challenge: {},
      socket: {},
      question: {},
      answers: [],
      studentAnswered: 0,
      ready: false,
    };
  },

  created() {
    console.log("after join chall");

    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
  },
  beforeDestroy() {
    this.removeEventBusListener();
    this.removeSocketListener(this.socket);
  },
  methods: {
    connectSocket() {
      const socketUrl = this.$socketUrl;
      var socket = io.connect(socketUrl);
      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("registerHostSocket", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        });

      socket.on("registerSuccess", (data) => {
        // console.log("challenge ", data);
        this.challenge = data;
        this.ready = true;
      });

      socket.on("joinError", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Cann't connect to room!!!",
          status: "error",
        });
        this.$router
          .push({
            name: "HOST",
          })
          .catch((err) => err);
      });

      return socket;
    },
    registerEvent(socket) {
      socket.on("startChallenge", () => {
        this.$router
          .push({
            name: "host.start",
            query: {
              challengeId: this.$route.query.challengeId,
            },
          })
          .catch((err) => err);
      });
      socket.on("publishQuestion", (data) => {
        this.question = data.question;
        this.answers = data.answers;
        this.studentAnswered = 0;

        this.$store.commit("setQuestion", data.question);
        this.$store.commit("setAnswers", data.answers);

        this.$router
          .push({
            name: "host.ready",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.question.id,
            },
          })
          .catch((err) => err);
      });

      socket.on("showCorrectAnswer", (data) => {
        this.$store.commit("setAnswers", data.answers);
        this.$router
          .push({
            name: "host.show",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.$route.query.questionId,
            },
          })
          .catch((err) => err);
      });

      socket.on("studentAnswer", () => {
        this.studentAnswered++;
        console.log(this.studentAnswered);
      });
      socket.on("endChallenge", () => {
        this.$router
          .push({
            name: "host.finish",
            query: {
              challengeId: this.$route.query.challengeId,
            },
          })
          .catch((err) => err);
      });

      this.$eventBus.$on("reAsk", ({ question, answers }) => {
        this.question = question;
        this.answers = answers;
        this.$router
          .push({
            name: "host.ask",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.question.id,
            },
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
    },
    removeEventBusListener() {
      this.$eventBus.$off("reAsk");
    },
  },
};
</script>

<style>
</style>