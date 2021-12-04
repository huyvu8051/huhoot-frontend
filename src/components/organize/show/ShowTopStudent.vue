<template>
  <v-btn color="cyan" @click="showTopStudent">
    <b> Rank Table </b>
  </v-btn>
</template>

<script>
import HostOrganizeService from "@/services/HostOrganizeService";
export default {
  props: {
    theLastQuestion: Boolean,
  },
  methods: {
    showTopStudent() {
      if (this.theLastQuestion) {
        console.log("finish");
        HostOrganizeService.endChallenge({
          challengeId: this.$route.query.challengeId,
        });
      } else {
        console.log("show rank");
        this.$router.push({
          name: "host.organize.rank",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        });
      }
    },
  },
};
</script>

<style>
</style>