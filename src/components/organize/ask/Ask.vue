<template>
  <div>
    <Question :question="question" :studentAnswered="studentAnswered">
      <template v-slot:topRight>
        <strong>
          {{ question.questionOrder }} of {{ question.totalQuestion }} total |
          {{ studentAnswered }} answered
        </strong>
      </template>
      <template v-slot:topLeft>
        <Skip />
      </template>
    </Question>

    <TimeCountDown
      :answerTimeLimit="question.answerTimeLimit"
      :askDate="question.askDate"
      class="py-2"
    />
    <Answers :answers="answers" />
  </div>
</template>

<script>
import Question from "@/components/Question";
import Answers from "@/components/Answers";
import Skip from "@/components/organize/ask/Skip";
import TimeCountDown from "@/components/organize/ask/TimeCountDown";

export default {
  components: {
    Question,
    TimeCountDown,
    Skip,
    Answers,
  },
  props: {
    question: Object,
    answers: Array,
    studentAnswered: Number,
  },
  created() {},
};
</script>

<style>
</style>