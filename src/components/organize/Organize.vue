<template>
  <v-main>
    <h-flex-layout>
      <router-view :connected="connected"/>
    </h-flex-layout>
  </v-main>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: {},
      connected: false
    };
  },

  created() {
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);

  
  },
  beforeDestroy() {
    this.removeSocketListener(this.socket);
  },
  methods: {
    connectSocket() {
      var socket = io.connect(this.$socketUrl);
      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("registerHostSocket", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        });

      socket.on("registerSuccess", (data) => {
        console.log("challenge ", data);
        this.challenge = data;
        this.connected = true;
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
        this.$store.commit("publishExam", data);

        this.$router
          .push({
            name: "host.ready",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.$store.state.question.id,
            },
          })
          .catch((err) => err);
      });

      socket.on("showCorrectAnswer", (data) => {
        this.$store.commit("showCorrectAnswer", data);
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
        this.$store.commit("aStudentSubmitedAnswer");
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
    },
    removeSocketListener(socket) {
      socket.off("connected");
      socket.off("registerSuccess");
      socket.off("joinError");
      socket.off("startChallenge");
      socket.off("publishQuestion");
      socket.off("showCorrectAnswer");
      socket.off("endChallenge");
    }
  },
};
</script>

<style>
</style>