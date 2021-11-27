<template>
  <QuestionLayout>
    <h1>Ready</h1>
  </QuestionLayout>
</template>

<script>
import HostPlayService from "@/services/HostPlayService";
import QuestionLayout from "@/components/host/organize/QuestionLayout";

export default {
  components: {
    QuestionLayout,
  },
  created() {
    setTimeout(() => {
      this.$router.push({
        name: "student.publishQuestionContent",
        query: {
          challengeId: this.$route.query.challengeId,
          questionId:  this.$route.query.questionId,
        },
      });
    }, 2000);
  },
};
</script>

<style>
</style>
