<template>
  <div>
    <v-progress-linear v-model="percent" color="yellow" height="25">
      <template v-slot:default="">
        <strong>{{ timeLeft }}</strong>
      </template>
    </v-progress-linear>
  </div>
</template>
<script>
import HostPlayService from "@/services/HostPlayService";
export default {
  data: () => ({
    timeLeft: 0,
    percent: 0,
    downloadTimer: {},
  }),

  mounted() {
    this.$eventBus.$on("countDown", (data) => {
      this.countdown(data.answerTime, data.askDate);
    });
    this.$eventBus.$on("skipQuestion", () => {
       clearInterval(this.downloadTimer);
       this.countdownFinish();
    });
  },
  methods: {
    countdown(answerTime, askDate) {
      clearInterval(this.downloadTimer);
      var that = this;
      this.downloadTimer = setInterval(function () {
        let now = new Date().getTime();
        let diff = now - askDate;
        const second = Math.floor((diff / 1000) % 60);

        let timeLeft = answerTime - second;

        if (timeLeft <= 0) {
          clearInterval(that.downloadTimer);
          that.timeLeft = "Finished";
          that.percent = 0;

          that.countdownFinish();
        } else {
          that.percent = Math.ceil((timeLeft / answerTime) * 100);
          that.timeLeft = timeLeft;
        }
      }, 1000);
    },
    countdownFinish() {
      HostPlayService.showCorrectAnswer({
        questionId: this.$route.query.questionId,
      });
    },
  },
};
</script>