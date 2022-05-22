<template>
  <v-row>
    <v-col
      cols="6"
      xs="6"
      sm="6"
      class="d-flex flex-column"
      v-for="(i, index) in answers"
      :key="i.id"
    >
      <!-- style="padding: 0.5rem 0.1rem" -->
      <!-- v-bind:class="{
          green: i.isCorrect,
        }" -->
      <v-card
        outlined
        class="flex d-flex flex-column"
        :style="getColor(index, i.isCorrect)"
      >
        <!-- color: i.isCorrect ? 'white' : 'black', -->
        <!-- style="padding: 0.25rem 0.1rem; color: white" -->
        <v-card-text class="flex white--text">
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