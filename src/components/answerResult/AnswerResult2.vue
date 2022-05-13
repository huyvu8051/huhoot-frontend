<template>
  <div>
    <Question>
      <template v-slot:topRight>
        <strong>
          {{ question.questionOrder }} of {{ question.totalQuestion }} total
        </strong>
      </template>
      <template v-slot:topLeft>
        <StatisticBtn />
      </template>
    </Question>

    <Answers />
  </div>
</template>

<script>
import Answers from "@/components/Answers";
import Question from "@/components/Question";
import StatisticBtn from "@/components/organize/show/StatisticBtn";

export default {
  components: {
    Answers,
    Question,
    StatisticBtn,
  },

  data() {
    return {
      answers: [],
      question: {},
    };
  },

  created() {
    this.question = this.$store.state.question;
    this.answers = this.$store.state.answers;
  },
  computed: {},
};
</script>

<style>
</style>