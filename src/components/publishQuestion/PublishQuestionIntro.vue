<template>
  <QuestionLayout>
    <h1>Get question...</h1>
  </QuestionLayout>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";
import QuestionLayout from "@/components/host/organize/QuestionLayout";

export default {
  components: {
    QuestionLayout,
  },
  created() {
    HostOrganizeService.publishNextQuestion({
      challengeId: this.$route.query.challengeId,
    });
  },
};
</script>

<style>
</style>
