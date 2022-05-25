<template>
  <div class="outer">
    <Question style="height: 43vh" />
    <Skip />
    <TimeCountDown :finish="doFinish" class="my-2" style="height: 4vh" />
    <Answers disable style="height: 43vh" />
  </div>
</template>

<script>
import Question from "@/components/Question";
import Answers from "@/components/Answers";
import Skip from "@/components/organize/ask/Skip";
import TimeCountDown from "@/components/TimeCountDown";

import HostOrganizeService from "@/services/HostOrganizeService";

import { mapState } from "vuex";

export default {
  components: {
    Question,
    TimeCountDown,
    Skip,
    Answers,
  },
  computed: mapState({
    question: (state) => state.question,
  }),
  methods:{
    doFinish(){
      HostOrganizeService.showCorrectAnswer({
        questionId: this.$route.query.questionId
      })

    }
  }
};
</script>

<style>
</style>