<template>
  <QuestionLayout :studentAnswered="studentAnswered">
    <Question :question="question" />

    <TimeCountDown class="py-2" />
    <v-row>
      <Answer :answer="item" v-for="(item, index) in answers" :key="index" />
    </v-row>
  </QuestionLayout>
</template>

<script>
import Question from "@/components/host/organize/Question";
import Answer from "@/components/host/organize/Answer";
import TimeCountDown from "@/components/host/organize/TimeCountDown";
import QuestionLayout from "@/components/host/organize/QuestionLayout";
export default {
  components: {
    Question,
    Answer,
    TimeCountDown,
    QuestionLayout,
  },
  props: {
    question: Object,
    answers: Array,
    studentAnswered: Number
  },
  mounted() {
    this.$eventBus.$emit("countDown", {
      answerTime: this.question.answerTimeLimit,
      askDate: this.question.askDate,
    });
  },
  destroyed() {
    this.$eventBus.$emit("countDown", {
      answerTime: 0,
      askDate: this.question.askDate,
    });
  },
  methods: {
    registSocket() {},
  },
};
</script>

<style>
</style>