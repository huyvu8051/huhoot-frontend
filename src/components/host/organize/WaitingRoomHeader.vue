<template>
  <v-app-bar app flat hide-on-scroll class="cyan">
    <b>{{ NumOfStudent }} Student</b>

    <v-spacer>
      <b>Challenge id: {{ $route.query.challengeId }}</b>
    </v-spacer>

    <v-btn class="red white--text" @click="lockChallenge"> Lock </v-btn>

    <v-btn class="deep-purple white--text" @click="startChallenge">
      Start
    </v-btn>
  </v-app-bar>
</template>

<script>
import HostPlayService from "@/services/HostPlayService";
export default {
  props: {
    NumOfStudent: Number,
  },
  data: () => ({
  }),
  created() {
    this.$eventBus.$on("updateScore", (data) => {
      this.score = data;
    });
  },
  components: {},
  methods: {
    startChallenge() {

      HostPlayService.startChallenge({
        challengeId: this.$route.query.challengeId,
      });
    },
    lockChallenge() {
      console.log("lock room");
    },
  },
};
</script>

<style></style>
