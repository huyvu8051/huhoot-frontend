<template>
  <h1>Get question...</h1>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  components: {},
  created() {
    console.log("get question");
    HostOrganizeService.publishNextQuestion({
      challengeId: this.$route.query.challengeId,
    });
  },
};
</script>

<style>
</style>
