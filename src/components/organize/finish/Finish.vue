<template>
  <v-main>
    <v-container fluid rounded-lg>
      <h1>Challenge finish</h1>
      <ChallengeRank>
        <template v-slot:nextQuestion>
          <v-btn
            :to="{
              name: 'HOST',
            }"
            color="green"
            class="white--text"
          >
            <b>Return home</b>
          </v-btn>
        </template>
      </ChallengeRank>
    </v-container>
  </v-main>
</template>

<script>
import ChallengeRank from "@/components/challengeRank/ChallengeRank";
export default {
  components: {
    ChallengeRank,
  },
};
</script>

<style>
</style>