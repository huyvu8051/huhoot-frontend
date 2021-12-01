<template>
  <v-main>
    <v-container fluid fill-height rounded-lg>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md10 lg8 xl6>
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