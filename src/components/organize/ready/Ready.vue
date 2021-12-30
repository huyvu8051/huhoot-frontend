<template>
  <div>
    <h1>{{ text }}</h1>
    <h5>{{ question.answerOption }} | {{ question.point }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
  },
  components: {},
  data: () => {
    return {
      text: "Ready",
      timeout: {},
    };
  },
  created() {
    this.text = "Question " + this.question.questionOrder;
    if (this.question.theLastQuestion) {
      this.text = "The last question";
    }

    this.timeout = setTimeout(() => {
      console.log("preview");
      this.$router.push({
        name: "host.preview",
        query: {
          challengeId: this.$route.query.challengeId,
          questionId: this.$route.query.questionId,
        },
      });
    }, 2500);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style>
</style>
