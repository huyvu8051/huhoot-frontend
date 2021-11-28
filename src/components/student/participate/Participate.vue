<template>
  <div>
    <Header :point="point" :submitable="submitable" />
    <router-view
      :socket="socket"
      :question="question"
      :answers="answers"
      :answerStatistics="answerStatistics"
    />
  </div>
</template>

<script>
import Header from "@/components/student/participate/ChallengeHeader";

import StudentPlayService from "@/services/StudentPlayService";

export default {
  components: {
    Header,
  },
  data() {
    return {
      socket: {},
      question: {},
      answers: [],
      answerStatistics: [],
      point: 0,
      submitable: false,
    };
  },
  created() {
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
    this.submitable = false;
  },
  destroyed() {
    this.$eventBus.$off("sentAnswer");
  },
  methods: {
    connectSocket() {
      const socketUrl = "http://159.223.38.181:8082";
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
          // console.log(data);
          this.student = data;
        })
        .on("joinError", (data) => {
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
          name: "student.startChallenge",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        });
      });

      socket.on("publishQuestion", (data) => {
        this.question = data.question;
        this.answers = data.answers;

        this.$router.push({
          name: "student.publishQuestionReady",
          query: {
            challengeId: this.$route.query.challengeId,
            questionId: this.question.id,
          },
        });
      });

      socket.on("showCorrectAnswer", (data) => {
        this.submitable = false;

        this.answers = data.answers;
        this.answerStatistics = data.answerStatistics;

        this.$router
          .push({
            name: "student.publishAnswerStatistics",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.$route.query.questionId,
            },
          })
          .catch((err) => err);
      });

      this.socket.on("endChallenge", () => {
        this.$router
          .push({
            name: "student.challengeFinish",
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

      // event bus
      // sent answer
      this.$eventBus.$on("sentAnswer", () => {
        var selected = [];
        this.answers.forEach((e) => {
          if (e.selected === true) {
            selected.push(e.id);
          }
        });

        StudentPlayService.sentAnswer({
          answerIds: selected,
          challengeId: this.$route.query.challengeId,
          questionId: this.$route.query.questionId,
        }).then((response) => {
          this.point = response.data;
        });

        console.log(selected);

        this.submitable = false;

        this.$router.push({
          name: "student.waiting",
          query: { challengeId: this.$route.query.challengeId },
        });
      });

      this.$eventBus.$on("submitable", () => {
        this.submitable = true;
      });
    },
  },
};
</script>

<style>
</style>