<template>
  <v-row>
    <v-col
      cols="12"
      xs="12"
      sm="6"
      class="pa-3 d-flex flex-column"
      v-for="(i, index) in answers"
      :key="i.id"
    >
      <!-- v-bind:class="{
          green: i.isCorrect,
        }" -->
      <v-card
        outlined
        class="flex d-flex flex-column"
        :style="getColor(index, i.isCorrect)"
      >
        <!-- color: i.isCorrect ? 'white' : 'black', -->

        <v-card-text
          class="flex"
          style="color: white"

        >
          <b>{{ i.content }}</b>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AnswerColorSchemes from "@/services/AnswerColorSchemes";
export default {
  data() {
    return {
      answers: [],
    };
  },
  created() {
    this.answers = this.$store.state.answers;
  },
  methods: {
    getColor(index, isCorrect) {
      return AnswerColorSchemes.getColor(index, isCorrect);
    },
  },
};
</script>

<style>
</style>