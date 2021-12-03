<template>
  <h1>Ready</h1>
</template>

<script>
export default {
  components: {},
  created() {
    setTimeout(() => {
      console.log("ask")
      this.$router.push({
        name: "host.ask",
        query: {
          challengeId: this.$route.query.challengeId,
          questionId: this.$route.query.questionId,
        },
      });
    }, 2000);
  },
};
</script>

<style>
</style>
