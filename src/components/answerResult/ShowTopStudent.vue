<template>
  <v-btn color="cyan" @click="showTopStudent">
    <b> Rank Table </b>
  </v-btn>
</template>

<script>
export default {
  methods: {
    showTopStudent() {
      this.$router.push({
        name: "host.topStudent",
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