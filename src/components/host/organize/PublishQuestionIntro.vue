<template>
  <v-flex xs12 sm12 md6 lg6 xl6>
    <h1>Publish Question Intro</h1>
    <h3>Ready</h3>
  </v-flex>
</template>

<script>
import HostPlayService from "@/services/HostPlayService";

export default {
  created() {
    HostPlayService.publishNextQuestion({
      challengeId: this.$route.query.challengeId,
    });
  },
};
</script>

<style>
</style>
