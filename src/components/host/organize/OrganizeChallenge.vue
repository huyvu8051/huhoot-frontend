<template>
  <router-view :socket="socket" />
</template>

<script>
export default {
  components: {},
  data() {
    return {
      socket: {},
      questionIds: [],
    };
  },
  created() {
    this.connectSocket();

    this.$eventBus.$on("getFirstQuestion", () => {
      let questionId = this.questionIds[0];
      this.$router.push({
        name: "host.publishQuestionIntro",
        params: {
          challengeId: this.$route.params.challengeId,
          questionId: questionId,
        },
      });
    });
  },
  methods: {
    connectSocket() {
      const socketUrl = "http://localhost:8082";
      this.socket = io.connect(socketUrl);

      this.registerEvent(this.socket);
    },
    registerEvent(socket) {
      let token = this.$store.state.token;

      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("registerHostSocket", {
          challengeId: this.$route.params.challengeId,
          token: token,
        })
        .on("registerSuccess", (data) => {
          // console.log(data);
          this.questionIds = data;
        });

      socket.on("joinError", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Cann't connect to room!!!",
          status: "error",
        });
      });
      socket.on("studentAnswer", (data) => {
        console.log(data);
      });
    },
  },
};
</script>

<style>
</style>