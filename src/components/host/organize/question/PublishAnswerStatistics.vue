<template>
  <v-flex xs12 sm12 md8 lg6 xl6>
    <AnswerStatistics  :answerStatistic="item" v-for="(item, index) in answerStatistics" :key="index" />
    <v-row>
      <Answer :answer="item" v-for="(item, index) in answers" :key="index" />
    </v-row>
  </v-flex>
</template>

<script>
import Question from "@/components/student/Question";
import Answer from "@/components/host/organize/question/Answer";
import AnswerStatistics from "@/components/host/organize/question/AnswerStatistics";
export default {
  components: {
    Question,
    Answer,
    AnswerStatistics,
  },
  props: {
    question: Object,
    answers: Array,
    answerStatistics: Array,
  },
  data: () => ({
    skill: 20,
  }),
};
</script>

<style>
</style>