<template>
  <v-btn color="red" @click="showStatistic"><b>statistic</b></v-btn>
</template>

<script>
export default {
  methods: {
    showStatistic() {
      console.log("show statistic");
      this.$router.push({
        name: "host.statistic",
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