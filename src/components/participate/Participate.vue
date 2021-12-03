<template>
  <v-main>
    <Header :point="totalPoint" />
    <FlexLayout>
      <router-view
        :socket="socket"
        :question="question"
        :answers="answers"
        :answerStatistics="answerStatistics"
        :isCorrectEncrypt="isCorrectEncrypt"
        :totalPointEncrypt="totalPointEncrypt"
        :encryptKey="encryptKey"
      />
    </FlexLayout>
  </v-main>
</template>

<script>
import Header from "@/components/participate/ChallengeHeader";

import FlexLayout from "@/components/FlexLayout";

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
    };
  },
  created() {
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
  },
  destroyed() {
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
        .emit("clientConnectRequest", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        })
        .on("registerSuccess", (data) => {
          console.log(data);
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
          name: "student.start",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        });
      });

      socket.on("publishQuestion", (data) => {
        this.question = data.question;
        this.answers = data.answers;

        this.isCorrectEncrypt = "";
        this.totalPointEncrypt = "";
        this.encryptKey = "";

        this.$router.push({
          name: "student.ready",
          query: {
            challengeId: this.$route.query.challengeId,
            questionId: this.question.id,
          },
        });
      });

      socket.on("showCorrectAnswer", (data) => {

        this.answers = data.answers;
        this.answerStatistics = data.answerStatistics;

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
        this.$router.push({
          name: "STUDENT",
        });
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
      socket.off("setTotalPoint");
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