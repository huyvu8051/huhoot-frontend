<template>
  <v-progress-linear :value="percent" color="yellow" height="inherit">
    <strong class="time-left">{{ timeLeft }}</strong>
  </v-progress-linear>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    finish: {
      type: Function,
      default: () => {},
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
  created(){
  },

  mounted() {
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
          
          clearInterval(that.countDownTimer);

          that.$store.commit("timeout");
          that.percent = 0;
          that.timeLeft = "Hết thời gian";
          that.finish();
        } else {
          that.percent = Math.ceil((timeLeft / totalTime) * 100);
          that.timeLeft = Math.ceil(timeLeft / 1000);
        }
      }, 200);
    },
  },
};
</script>

<style scoped>
.time-left{
  font-size: calc(0.4rem + 1.76267vmin);
}
</style>