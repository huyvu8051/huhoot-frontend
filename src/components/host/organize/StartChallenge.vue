<template>
  <v-main>
    <v-container fluid fill-height rounded-lg>
      <v-layout align-center justify-center>
        <h1>{{ timeleft }}</h1>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => {
    return {
      intervalObj: null,
      timeleft: "Start challenge",
      timeleftCountDown: null,
    };
  },
  created() {
    this.countdown();

    this.intervalObj = setInterval(() => {
      this.startChallenge();
    }, 4000);
  },
  destroyed() {
    clearInterval(this.intervalObj);
    clearInterval(this.timeleftCountDown);
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
    countdown() {
      var timeleft = 3;

      var that = this;
      this.timeleftCountDown = setInterval(function () {
        if (timeleft <= 0) {
          clearInterval(this.timeleftCountDown);
        }
        that.timeleft = timeleft;
        timeleft--;
      }, 1000);
    },
  },
};
</script>

<style scoped>

</style>