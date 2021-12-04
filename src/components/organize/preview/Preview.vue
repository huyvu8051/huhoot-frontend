<template>
  <div>
    <h1>
      {{ question.questionContent }}
    </h1>
    <Progress />
  </div>
</template>

<script>
import Progress from "@/components/Progress";
export default {
  components: {
    Progress,
  },
  props: {
    question: Object,
  },
  created() {
    if (this.question.theLastQuestion) {
      this.text = "The last question";
    }

    setTimeout(() => {
      console.log("ask");
      this.$router.push({
        name: "host.ask",
        query: {
          challengeId: this.$route.query.challengeId,
          questionId: this.$route.query.questionId,
        },
      });
    }, 3000);
  },
};
</script>

<style>
</style>