<template>
  <v-progress-linear
    v-model="percent"
    color="blue"
    height="40"
    class="my-5"
    rounded
  >
    <template v-slot:default="{ value }">
      <span class="d-inline-block text-truncate pl-3" style="max-width: 400px" >
        {{ answerStatistic.answerContent }}
      </span>
      <v-spacer></v-spacer>
      <strong class="pr-3">
        {{ Math.ceil(value) }}%|
        {{ answerStatistic.numberOfStudentSelect }} students
      </strong>
    </template>
  </v-progress-linear>
</template>

<script>
export default {
  props: {
    totalStudentAnswer: Number,
    answerStatistic: Object,
  },
  data: () => ({}),
  computed: {
    percent() {
      return (
        (this.answerStatistic.numberOfStudentSelect / this.totalStudentAnswer) *
        100
      );
    },
  },
};
</script>

<style>
</style>