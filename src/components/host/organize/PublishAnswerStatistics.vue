<template>
  <AnswerResult
    :question="question"
    :answers="answers"
    :answerStatistics="answerStatistics"
  >
    <template v-slot:showTopStudent> <ShowTopStudent /> </template>
  </AnswerResult>
</template>

<script>
import AnswerResult from "@/components/answerResult/AnswerResult";
import ShowTopStudent from "@/components/answerResult/ShowTopStudent";

export default {
  components: {
    AnswerResult,
    ShowTopStudent,
  },
  props: {
    question: Object,
    answers: Array,
    answerStatistics: Array,
  },
  computed: {
    totalAnswer() {
      let total = 0;
      this.answerStatistics.forEach((e) => (total += e.numberOfStudentSelect));
      return total;
    },
  },
};
</script>

<style>
</style>