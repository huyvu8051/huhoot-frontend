<template>
  <v-flex xs12 sm12 md8 lg6 xl6>
    <Question :question="question" />

    <TimeCountDown class="py-2" />
    <v-row>
      <Answer :answer="item" v-for="(item, index) in answers" :key="index" />
    </v-row>
  </v-flex>
</template>

<script>
import Question from "@/components/student/Question";
import Answer from "@/components/host/organize/question/Answer";
import TimeCountDown from "@/components/host/organize/question/TimeCountDown";
export default {
  components: {
    Question,
    Answer,
    TimeCountDown,
  },
  props: {
    question: Object,
    answers: Array,
  },
  mounted() {
    this.$eventBus.$emit("countDown", {
      answerTime: this.question.answerTimeLimit,
      askDate: this.question.askDate,
    });
  },destroyed(){
      this.$eventBus.$emit("countDown", {
      answerTime: 0,
      askDate: this.question.askDate,
    });
  },
  methods:{
    registSocket(){
      
    }
  }
};
</script>

<style>
</style>