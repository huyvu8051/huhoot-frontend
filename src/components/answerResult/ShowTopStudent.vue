<template>
  <v-btn color="cyan" @click="showTopStudent">
    <b> Rank Table </b>
  </v-btn>
</template>

<script>
export default {
  methods: {
    showTopStudent() {
      console.log("show rank")
      this.$router.push({
        name: "host.organize.rank",
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