<template>
  <AnswerResult/>
</template>

<script>
import AnswerResult from "@/components/answerResult/AnswerResult";


export default {
  components: {
    AnswerResult,
  },

  created() {
    var pointsReceived = this.$store.state.pointsReceived;

    switch (pointsReceived) {
      case "":
        this.timeout();
        break;

      case "0.0":
        this.incorrect();
        break;

      default:
        this.correct(pointsReceived);
        break;
    }
  },
  methods: {
    correct(point) {
      this.$swal({
        icon: "success",
        title: "Good job!",
        text: "Your answer is correct! \n Points received +" + parseInt(point),
        timer: 3000,
      });
    },
    incorrect() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Incorrect answer!",
        timer: 3000,
      });
    },
    timeout() {
      this.$swal({
        icon: "warning",
        title: "Timeout",
        text: "Better luck next time!",
        timer: 3000,
      });
    },
  },
};
</script>

<style>
</style>