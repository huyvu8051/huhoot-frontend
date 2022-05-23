<template>
  <v-btn color="red" @click="click"><b>{{isTimeout.text}}</b></v-btn>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";

import { mapState } from "vuex";

export default {
  computed: mapState({
    isTimeout: (state) => {
      if(state.question.timeout < new Date().getTime()){
        return {
          value: true,
          text: "Next"
        }
      }else{
        return {
          value: false,
          text: "Skip"
        }
      }
    },
  }),
  methods: {
    click() {
      if (this.isTimeout.value) {
        this.getNextQuestion();
      } else {
        this.skipQuestion();
      }
    },

    skipQuestion() {
      HostOrganizeService.showCorrectAnswer({
        questionId: this.$route.query.questionId,
      });
    },
    getNextQuestion() {
      this.$router.push({
        name: "organize.get",
        query: {
          challengeId: this.$route.query.challengeId,
        },
      });
    },
  },
};
</script>

<style>
</style>