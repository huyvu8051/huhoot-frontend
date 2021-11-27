<template>
  <v-progress-linear v-model="skill" color="blue-grey" height="25">
    <template v-slot:default="{ value }">
      <strong>{{ Math.ceil(value) }}%</strong>
    </template>
  </v-progress-linear>
</template>

<script>
export default {
  data: () => ({
    skill: 20,
  }),
};
</script>

<style>
</style>