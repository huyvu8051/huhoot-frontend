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
        :answerStatistic="item"
        :totalStudentAnswer="totalAnswer"
        v-for="(item, index) in answerStatistics"
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