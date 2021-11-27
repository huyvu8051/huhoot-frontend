<template>
  <v-progress-linear v-model="percent" color="blue" height="30" class="my-5" rounded >
    <template v-slot:default="{value}">
      <strong>{{ answerStatistic.answerContent}} {{ Math.ceil(value) }}% {{answerStatistic.numberOfStudentSelect}} students</strong>
    </template>
  </v-progress-linear>
</template>

<script>
export default {
  props: {
    totalStudentAnswer: Number,
    answerStatistic: Object,
  },
  data: () => ({
  }),
  computed: {
    percent() {
      return (this.answerStatistic.numberOfStudentSelect / this.totalStudentAnswer) * 100;
    },
  },
};
</script>

<style>
</style>