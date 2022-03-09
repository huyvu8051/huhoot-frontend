<template>
  <div>
    <Question>
      <template v-slot:topRight>
        <strong>
          {{ question.questionOrder }} of {{ question.totalQuestion }} total |
          {{ $store.state.studentAnswered }} answered
        </strong>
      </template>
      <template v-slot:topLeft>
        <Skip />
      </template>
    </Question>

    <TimeCountDown
      :finish="doFinish"
      class="py-2"
    />
    <Answers />
  </div>
</template>

<script>
import Question from "@/components/Question";
import Answers from "@/components/Answers";
import Skip from "@/components/organize/ask/Skip";
import TimeCountDown from "@/components/TimeCountDown";


import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  components: {
    Question,
    TimeCountDown,
    Skip,
    Answers,
  },
  data() {
    return {
      question: {},
    };
  },
  created() {
    this.question = this.$store.state.question;
  },
  methods:{
    doFinish(){
      console.log("countdown finish");
      HostOrganizeService.showCorrectAnswer({
        questionId: this.$route.query.questionId,
      });
    }
  }
};
</script>

<style>
</style>