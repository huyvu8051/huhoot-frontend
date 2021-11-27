<template>
  <v-main>
    <ChallengeHeader />
    <v-container fluid rounded-lg>
      <v-layout align-center justify-center>
        <router-view :question="question" :answers="answers" :answerStatistics="answerStatistics" />
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import ChallengeHeader from "@/components/host/organize/ChallengeHeader";

import HostPlayService from "@/services/HostPlayService";

export default {
  components: {
    ChallengeHeader,
  },
  props: {
    socket: Object,
  },
  data: () => ({
    question: {},
    answers: [],
    answerStatistics: [],
    challengeId: 0,
  }),
  created() {
    this.registSocketEvent();
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    registSocketEvent() {
      console.log(this.socket)
      this.socket.on("publishQuestion", (data) => {
        console.log(data);
        this.question = data.question;
        this.answers = data.answers;
      });
      this.socket.on("showCorrectAnswer", (data) => {
        console.log(data);
       this.answers = data.answers;
       this.answerStatistics = data.answerStatistics;
       
       this.$router.push({
            name: "host.publishAnswerStatistics",
            params: {
              challengeId: this.$route.params.challengeId,
              questionId: this.$route.params.questionId,
            },
          });
      });
    },
    getQuestion() {
      setTimeout(() => {
        HostPlayService.publishQuestion({
          questionId: this.$route.params.questionId,
        }).then(() => {
          this.$router.push({
            name: "host.publishQuestionContent",
            params: {
              challengeId: this.$route.params.challengeId,
              questionId: this.$route.params.questionId,
            },
          });
        });
      }, 2000);
    },
  },
};
</script>

<style>
</style>