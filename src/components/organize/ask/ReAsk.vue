<template>
  <div>
    <h1>Reconnecting...</h1>
   
  </div>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";
export default {
  created() {
    HostOrganizeService.getCurrentQuestion({
      challengeId: this.$route.query.challengeId,
    }).then((response) => {
      this.$eventBus.$emit("reAsk", response.data);
    });
  },
};
</script>

<style>
</style>