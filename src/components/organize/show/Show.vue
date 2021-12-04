<template>
  <AnswerResult
    :question="question"
    :answers="answers"
    :answerStatistics="answerStatistics"
  >
    <template v-slot:showTopStudent> <ShowTopStudent :theLastQuestion="question.theLastQuestion" /> </template>
  </AnswerResult>
</template>

<script>
import AnswerResult from "@/components/answerResult/AnswerResult";
import ShowTopStudent from "@/components/organize/show/ShowTopStudent";

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
  created(){
    console.log("theLastQuestion",this.question.theLastQuestion);
  }
  
};
</script>

<style>
</style>