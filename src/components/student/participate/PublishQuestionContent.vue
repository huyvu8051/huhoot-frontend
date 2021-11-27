<template>
  <QuestionLayout>
    <Question :question="question" />

    <TimeCountDown class="py-2" />
    <v-row>
      <Answer :answer="item" v-for="(item, index) in answers" :key="index" />
    </v-row>
  </QuestionLayout>
</template>

<script>
import Question from "@/components/student/participate/Question";
import Answer from "@/components/student/participate/Answer";
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
  },
  mounted() {
    this.$eventBus.$emit("submitable");
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