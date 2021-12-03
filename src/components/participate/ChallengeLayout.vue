<template>
  <v-main>
    <v-container fluid fill-height rounded-lg>
      <v-layout align-center justify-center>
        <router-view />
      </v-layout>
    </v-container>
    <ChallengeHeader/>
  </v-main>
</template>

<script>
import ChallengeHeader from "@/components/participate/ChallengeHeader";
export default {
  components: {
    ChallengeHeader
  },
};
</script>

<style>
</style>