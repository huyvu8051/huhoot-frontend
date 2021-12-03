<template>
  <v-main>
    <FlexLayout>
      <router-view
        :socket="socket"
        :question="question"
        :answers="answers"
        :answerStatistics="answerStatistics"
        :studentAnswered="studentAnswered"
      />
    </FlexLayout>
  </v-main>
</template>

<script>
import FlexLayout from "@/components/FlexLayout";

export default {
  components: { FlexLayout },
  data() {
    return {
      socket: {},
      question: {},
      answers: [],
      answerStatistics: [],
      studentAnswered: 0,
    };
  },
  created() {
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
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
        })
        .on("registerSuccess", (data) => {
          // console.log(data);
          this.student = data;
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
        this.$router.push({
          name: "host.start",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        });
      });
      this.socket.on("publishQuestion", (data) => {
        this.question = data.question;
        this.answers = data.answers;
        this.studentAnswered = 0;

        this.$router.push({
          name: "host.ready",
          query: {
            challengeId: this.$route.query.challengeId,
            questionId: this.question.id,
          },
        });
      });

      this.socket.on("showCorrectAnswer", (data) => {
        this.answers = data.answers;
        this.answerStatistics = data.answerStatistics;

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

      this.socket.on("studentAnswer", () => {
        this.studentAnswered++;
        console.log(this.studentAnswered);
      });
      this.socket.on("endChallenge", () => {
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
  },
};
</script>

<style>
</style>