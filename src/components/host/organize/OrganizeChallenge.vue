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
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
  },
  methods: {
    connectSocket() {
      const socketUrl = "http://localhost:8082";
      var socket = io.connect(socketUrl);
      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("registerHostSocket", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        })
        .on("registerSuccess", (data) => {
          // console.log(data);
          this.questionIds = data;
        })
        .on("joinError", (data) => {
          this.$eventBus.$emit("nofication", {
            message: "Cann't connect to room!!!",
            status: "error",
          });
          throw "Cannot connect socket"
        });

      return socket;
    },
    registerEvent(socket) {
      socket.on("startChallenge", () => {
        this.$router.push({
          name: "host.startChallenge",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        });
      });

      
    },
  },
};
</script>

<style>
</style>