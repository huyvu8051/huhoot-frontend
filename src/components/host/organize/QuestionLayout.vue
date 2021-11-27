<template>
  <v-main>
    <v-container fluid rounded-lg>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md6 lg6 xl6>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import ChallengeHeader from "@/components/host/organize/ChallengeHeader";

export default {
  props: {
    studentAnswered: Number,
  },
  components: {
    ChallengeHeader,
  },
};
</script>

<style>
</style>