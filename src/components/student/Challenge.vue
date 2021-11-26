<template>
  <v-flex xs12 sm12 md12>
    <Question v-if="question != null" :question="question" />

    <TimeCountDown class="py-2" />
    <v-row>
      <Answer
        :answer="item"
        v-for="(item, index) in answers"
        :key="index"
      />
    </v-row>
  </v-flex>
</template>

<script>
import Question from "@/components/student/Question";
import Answer from "@/components/student/Answer";
import TimeCountDown from "@/components/TimeCountDown";
import StudentPlayService from "@/services/StudentPlayService";

export default {
  components: {
    Question,
    Answer,
    TimeCountDown,
  },
  data: () => ({
    question: {},
    answers: [],
    challengeId: 0,
  }),

  mounted() {
    this.connectSocket();
    this.$eventBus.$on("sentAnswer", () => {
      this.sentAnswer();
    });
  },
  methods: {
    sentAnswer() {
      var selected = [];
      this.answers.forEach((e) => {
        if (e.selected === true) {
          selected.push(e.id);
        }
      });

      let challengeId = this.$route.params.challengeId;

      StudentPlayService.sentAnswer({
        answerIds: selected,
        challengeId: challengeId,
        questionId: this.question.id
      });

      console.log(selected);
    },

    connectSocket() {
      const socketUrl = "http://localhost:8082";
      const socket = io.connect(socketUrl);

      this.registerEvent(socket);
    },

    // regist event
    registerEvent(socket) {
      let challengeId = this.$route.params.challengeId;
      let token = this.$store.state.token;

      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("clientConnectRequest", {
          challengeId: challengeId,
          token: token,
        });

      socket.on("joinError", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Cann't connect to room!!!",
          status: "error",
        });
      });

      socket.on("publishQuestion", (data) => {
        this.question = data.question;
        this.answers = data.answers;
        console.log(this.question, this.answers);

        this.$eventBus.$emit("countDown", {
          answerTime: this.question.answerTimeLimit,
          askDate: this.question.askDate,
        });
      });

      socket.on("showCorrectAnswer", (answers) => {
        this.$eventBus.$emit("nofication", {
          message: "Timeup!!!",
        });
        this.answers = answers;
      });

      socket.on("endChallenge", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Challenge ended!!!",
        });
      });

      socket.on("kickStudent", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "You're out!!!",
        });
      });
    },
  },
};
</script>

<style>
</style>