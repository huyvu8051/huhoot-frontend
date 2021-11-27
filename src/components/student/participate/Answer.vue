<template>
  <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
    <v-btn
      min-height="60"
      width="100%"
      color="black lighten-2"
      text
      v-bind:class="{ green: answer.correct, yellow: this.selected }"
      @click="selectAnswer"
      outlined
    >
      <b>{{ answer.answerContent }}</b>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  props: {
    answer: Object,
  },
  data: () => ({
    selected: false,
  }),
  created() {
    this.answer.selected = false;
  },
  methods: {
    selectAnswer() {
      if (this.answer.selected === undefined) {
        this.answer.selected = this.selected = true;
      } else {
        this.answer.selected = this.selected = !this.selected;
      }
    },
  },
};
</script>

<style>
</style>