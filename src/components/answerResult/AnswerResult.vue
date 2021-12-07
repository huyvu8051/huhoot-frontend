<template>
  <v-card>
    <v-card-title>
      Statistics
      <v-spacer>
        <ShowQuestion :question="question" />
      </v-spacer>
      <slot name="showTopStudent" />
    </v-card-title>
    <v-card-text>
      <AnswerStatistics
        :answers="item"
        :totalStudentAnswer="totalAnswer"
        v-for="(item, index) in answers"
        :key="index"
      />

      <Answers :answers="answers" />
    </v-card-text>
  </v-card>
</template>

<script>
import ShowQuestion from "@/components/ShowQuestion";
import Answers from "@/components/Answers";
import AnswerStatistics from "@/components/answerResult/AnswerStatistics";

export default {
  components: {
    AnswerStatistics,
    Answers,
    ShowQuestion,
  },
  props: {
    question: Object,
    answers: Array,
  },
  computed: {
    totalAnswer() {
      let total = 0;
      this.answers.forEach((e) => (total += e.numberOfStudentSelect));
      return total;
    },
  },
};
</script>

<style>
</style>