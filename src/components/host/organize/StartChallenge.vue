<template>
  <v-main>
    <v-container fluid rounded-lg>
      <v-layout align-center justify-center>
        <h1>Start challenge</h1>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => {
    return {
      intervalObj: null,
    };
  },
  created() {
    this.intervalObj = setInterval(() => {
      this.startChallenge();
    }, 3000);
  },
  destroyed() {
    clearInterval(this.intervalObj);
  },
  methods: {
    startChallenge() {
      this.$router.push({
        name: "host.publishQuestionIntro",
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