<template>
  <v-main>
    <ChallengeHeader />
    <v-container fluid rounded-lg>
      <v-layout align-center justify-center>
        <router-view
          :question="question"
          :answers="answers"
          :answerStatistics="answerStatistics"
        />
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import ChallengeHeader from "@/components/host/organize/ChallengeHeader";

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
  methods: {
    registSocketEvent() {
      /**
       * handle socket event: publish question
       */
      this.socket.on("publishQuestion", (data) => {
        console.log(data);
        this.question = data.question;
        this.answers = data.answers;

        setTimeout(() => {
          this.$router.push({
            name: "host.publishQuestionContent",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.question.id,
            },
          });
        }, 2000);
      });

      this.socket.on("showCorrectAnswer", (data) => {
        console.log(data);
        this.answers = data.answers;
        this.answerStatistics = data.answerStatistics;

        this.$router.push({
          name: "host.publishAnswerStatistics",
          query: {
            challengeId: this.$route.query.challengeId,
            questionId: this.$route.query.questionId,
          },
        });
      });
    },
  },
};
</script>

<style>
</style>