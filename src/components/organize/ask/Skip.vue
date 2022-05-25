<template>
  <v-btn color="#262766" class="white--text" fixed right bottom @click="click"
    ><v-icon>{{ isTimeout.text }}</v-icon></v-btn
  >
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";

import { mapState } from "vuex";

export default {
  computed: mapState({
    isTimeout: (state) => {
      if (state.question.timeout < new Date().getTime()) {
        return {
          value: true,
          text: "mdi-skip-next",
        };
      } else {
        return {
          value: false,
          text: "mdi-skip-next",
        };
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