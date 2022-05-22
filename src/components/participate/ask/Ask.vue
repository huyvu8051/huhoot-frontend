<template>
  <div>
    <Question>
      <template v-slot:topRight>
        <strong>
          {{ question.questionOrder }} of {{ question.totalQuestion }} total
        </strong>
      </template>
      <template v-slot:topLeft>
        <Answer :selectedIds="selectedIds" />
      </template>
    </Question>

    <TimeCountDown :finish="doFinish" class="py-2" />
    <v-row>
      <v-col
        
        cols="12"
        xs="12"
        sm="6"
        class="pa-3 d-flex flex-column"
        v-for="(i, index) in cloneAnswers"
        :key="i.id"
      >
        <!-- v-bind:class="{ green: i.correct, yellow: i.selected }" -->
        <v-card
          outlined
          class="flex d-flex flex-column"
          :disabled="disabled"
          @click="selectAnswer(i)"
          :style="getColor(index, i.isCorrect, i.selected)"
        >
          <v-card-text class="flex" style="color: white">
            <b>{{ i.content }}</b>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Answer from "@/components/participate/ask/Answer";
import Question from "@/components/Question";
import TimeCountDown from "@/components/TimeCountDown";

import AnswerColorSchemes from "@/services/AnswerColorSchemes";

export default {
  components: {
    Question,
    TimeCountDown,
    Answer,
  },

  data: () => {
    return {
      cloneAnswers: [],
      answers: [],
      question: {},
      disabled: false
    };
  },
  created() {
    this.answers = this.$store.state.answers;
    this.question = this.$store.state.question;

    // prevent modify father props
    this.cloneAnswers = this.answers.map((e) =>
      Object.assign({ selected: false }, e)
    );

    this.$eventBus.$on("answered", ()=>{
      this.disabled = true;
      console.log("disabled");
    })
  },
  beforeDestroy(){
     this.$eventBus.$off("answered")
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
    getColor(index, isCorrect, isSelected) {
      return AnswerColorSchemes.getColor(index, isCorrect, isSelected);
    },
    selectAnswer(item) {
      item.selected = !item.selected;
    },
    doFinish() {
      this.$store.state.getCorrectAnswer(this.$route.query.questionId);
      // this.$router
      //   .push({
      //     name: "student.wait",
      //     query: {
      //       challengeId: this.$route.query.challengeId,
      //     },
      //   })
      //   .catch((err) => err);
    },
  },
};
</script>

<style>
</style>