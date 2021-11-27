<template>
  <v-app-bar app flat hide-on-scroll class="cyan">
    <b>{{ numOfStudents }} Student</b>

    <v-spacer>
      <b>Challenge id: {{ $route.params.challengeId }}</b>
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
  data: () => ({
    numOfStudents: 0,
  }),
  created() {
    this.$eventBus.$on("updateScore", (data) => {
      this.score = data;
    });
  },
  components: {},
  methods: {
    startChallenge() {
      console.log("start challenge");

      this.$router.push({
        name: "startChallenge",
        params: { challengeId: this.$route.params.challengeId, questionId: 0 },
      });
    },
    lockChallenge() {
      console.log("lock room");
    },
  },
};
</script>

<style></style>
