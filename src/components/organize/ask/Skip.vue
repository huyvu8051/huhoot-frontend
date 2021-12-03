<template>
  <v-btn color="red" @click="skipQuestion"><b>Skip</b></v-btn>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  methods: {
    skipQuestion() {
      console.log("skip question");
      HostOrganizeService.showCorrectAnswer({
        questionId: this.$route.query.questionId,
      });
    },
  },
};
</script>

<style>
</style>