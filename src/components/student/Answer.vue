<template>
  <v-col cols="6" >
    <v-card>
      <v-btn
        min-height="100"
        width="100%"
        color="black lighten-2"
        text
        @click="selectAnswer"
        v-bind:class="{ green: this.selected }"
      >
        <b>{{ answer.answerContent }}</b>
      </v-btn>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    answer: Object
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