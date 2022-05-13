<template>
  <AnswerResult>
    <template v-slot:topLeft>
      <StatisticBtn />
    </template>
  </AnswerResult>
</template>

<script>
import AnswerResult from "@/components/answerResult/AnswerResult2";
import ShowTopStudent from "@/components/organize/show/ShowTopStudent";

import StatisticBtn from "@/components/organize/show/StatisticBtn";
export default {
  components: {
    AnswerResult,
    ShowTopStudent,
    
    StatisticBtn,
  },
};
</script>

<style>
</style>