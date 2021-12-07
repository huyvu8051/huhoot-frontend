<template>
  <v-main>
    <FlexLayout>
      <router-view
        :socket="socket"
        :question="question"
        :answers="answers"
        :studentAnswered="studentAnswered"
        :theLastQuestion="question.theLastQuestion"
        :ready="ready"
      />
    </FlexLayout>
  </v-main>
</template>

<script>
import FlexLayout from "@/components/FlexLayout";
import io from 'socket.io-client';
export default {
  components: { FlexLayout },
  data() {
    return {
      socket: {},
      question: {},
      answers: [],
      answerStatistics: [],
      studentAnswered: 0,
      ready: false,
    };
  },

  created() {
    var currName = this.$router.currentRoute.name;
    var challengeId = this.$route.query.challengeId;

    this.joinChallenge(challengeId, currName);

    console.log("after join chall");

    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
  },
  beforeDestroy() {
    this.removeEventBusListener();
    this.removeSocketListener(this.socket);
  },
  methods: {
    joinChallenge(challengeId, currName) {
      console.log("currName", currName);

      var targetName = currName;

      switch (currName) {
        case "host.ready":
        case "host.preview":
        case "host.ask":
          targetName = "host.ask";
          break;
        case "host.get":
          targetName = "host.wait";
          break;
        default:
          break;
      }
      this.$router
        .push({
          name: targetName,
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
        .emit("registerHostSocket", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        })
        .on("registerSuccess", (data) => {
          // console.log(data);
          this.student = data;
          this.ready = true;
        });

      socket.on("joinError", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Cann't connect to room!!!",
          status: "error",
        });
        throw "Cannot connect socket";
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
        this.answers = data.answers;

        console.log(this.answers);

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
    removeEventBusListener() {},
  },
};
</script>

<style>
</style>