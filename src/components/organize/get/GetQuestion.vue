<template>
  <h1>Get question...</h1>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  props: {
    ready: Boolean,
  },
  components: {},
  created() {
    if (this.ready) {
      console.log("get question");
      HostOrganizeService.publishNextQuestion({
        challengeId: this.$route.query.challengeId,
      });
    }else{
      console.log("socket not ready!")
    }
  },
};
</script>

<style>
</style>
