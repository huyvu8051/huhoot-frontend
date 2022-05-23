<template>
  <div>
    <v-progress-linear :value="percent" color="yellow" height="25">
      <template v-slot:default="">
        <strong>{{ timeLeft }}</strong>
      </template>
    </v-progress-linear>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    finish: {
      type: Function,
      default: ()=>console.log("count down finished")
    },
  },
  data: () => ({
    timeLeft: 0,
    percent: 100,
    countDownTimer: {},
  }),
  computed: mapState({
    timeout: (state) => state.question.timeout,
  }),

  mounted() {
    console.log("timeout", this.$store.state.question);
    this.countdown2();
  },
  beforeDestroy() {
    clearInterval(this.countDownTimer);
  },
  methods: {
    countdown2() {
      var totalTime = this.timeout - new Date().getTime();
      var that = this;
      clearInterval(this.countDownTimer);
      this.countDownTimer = setInterval(() => {
        let now = new Date().getTime();

        var timeLeft = this.timeout - now;

        if (timeLeft <= 0) {
          that.$store.commit("disableSubmit");
          that.percent = 0;
          that.timeLeft = "Finished";
          that.finish();
          clearInterval(that.countDownTimer);
        } else {
          that.percent = Math.ceil((timeLeft / totalTime) * 100);
          that.timeLeft = Math.ceil(timeLeft / 1000);
        }
      }, 200);
    },
    countdown(answerTime, askDate) {
      //console.log("start countdown");

      clearInterval(this.countDownTimer);
      var that = this;
      this.countDownTimer = setInterval(() => {
        let now = new Date().getTime();
        let diff = now - askDate;
        const second = Math.floor((diff / 1000) % 60);

        let timeLeft = answerTime - second;

        if (timeLeft <= 0) {
          that.$store.commit("disableSubmit");
          that.percent = 0;
          that.timeLeft = "Finished";
          that.finish();
          clearInterval(that.countDownTimer);
        } else {
          that.percent = Math.ceil((timeLeft / answerTime) * 100);
          that.timeLeft = timeLeft;
        }
      }, 200);
    },
  },
};
</script>