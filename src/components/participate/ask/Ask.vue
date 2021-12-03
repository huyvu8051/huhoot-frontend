<template>
  <div>
    <Question :question="question">
      <template v-slot:topLeft>
        <Answer :selectedIds="selectedIds" />
      </template>
    </Question>

    <TimeCountDown
      class="py-2"
      :answerTimeLimit="question.answerTimeLimit"
      :askDate="question.askDate"
    />
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        class="pa-3 d-flex flex-column"
        v-for="i in cloneAnswers"
        :key="i.id"
      >
        <v-card
          outlined
          class="flex d-flex flex-column"
          v-bind:class="{ green: i.correct, yellow: i.selected }"
          @click="selectAnswer(i)"
        >
          <v-card-text class="flex">
            <b>{{ i.answerContent + i.id }}</b>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Answer from "@/components/participate/ask/Answer";
import Question from "@/components/Question";
import TimeCountDown from "@/components/participate/ask/TimeCountDown";
export default {
  components: {
    Question,
    TimeCountDown,
    Answer,
  },
  props: {
    question: Object,
    answers: Array,
  },

  data: () => {
    return {
      cloneAnswers: [],
    };
  },
  created() {
    // prevent modify father props
    this.cloneAnswers = this.answers.map((e) => Object.assign({selected: false}, e));
  },
  computed: {
    selectedIds() {
      return this.cloneAnswers
        .filter((e) => e.selected)
        .map((e) => {
          if (e.selected) return e.id;
        });
    },
  },

  methods: {
    selectAnswer(item) {
      item.selected = !item.selected;
    },
  },
};
</script>

<style>
</style>