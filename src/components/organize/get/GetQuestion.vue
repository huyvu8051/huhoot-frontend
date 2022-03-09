<template>
  <h1>Get question...</h1>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  props: {
    connected: Boolean,
  },
  created() {
    if (this.connected) {
      console.log("get question");
      HostOrganizeService.publishNextQuestion({
        challengeId: this.$route.query.challengeId,
      });
    } else {
      console.log("socket not connected!");
      this.$router
        .push({
          name: "host.start",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        })
        .catch((err) => err);
    }
  },
};
</script>

<style>
</style>
