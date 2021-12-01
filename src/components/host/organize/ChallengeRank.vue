<template>
  <ChallengeRank>
    <template v-slot:nextQuestion>
      <NextQuestion />
    </template>
  </ChallengeRank>
</template>

<script>
import ChallengeRank from "@/components/challengeRank/ChallengeRank";

import NextQuestion from "@/components/challengeRank/NextQuestion";
export default {
  components: {
    ChallengeRank,
    NextQuestion,
  },
};
</script>

<style>
</style>