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
import HostOrganizeService from "@/services/HostOrganizeService";
export default {
  props: {
    answerTimeLimit: Number,
    askDate: Number,
  },
  data: () => ({
    timeLeft: 0,
    percent: 0,
    countDownTimer: {},
  }),

  mounted() {
    this.countdown(this.answerTimeLimit, this.askDate);
  },
  destroyed() {
    clearInterval(this.countDownTimer);
  },
  methods: {
    countdown(answerTime, askDate) {
      console.log("start countdown")

      clearInterval(this.countDownTimer);
      var that = this;
      this.countDownTimer = setInterval(function () {
        let now = new Date().getTime();
        let diff = now - askDate;
        const second = Math.floor((diff / 1000) % 60);

        let timeLeft = answerTime - second;

        if (timeLeft <= 0) {
          clearInterval(that.countDownTimer);
          that.percent = 0;
          that.timeLeft = "Finished";
          that.countdownFinish();
        } else {
          that.percent = Math.ceil((timeLeft / answerTime) * 100);
          that.timeLeft = timeLeft;
        }
      }, 1000);
    },
    countdownFinish() {
      console.log("countdown finish");
      HostOrganizeService.showCorrectAnswer({
        questionId: this.$route.query.questionId,
      });
    },
  },
};
</script>