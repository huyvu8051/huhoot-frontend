<template>
  <div>
    <Question>
      <template v-slot:topRight>
        <strong>
          {{ question.questionOrder }} of {{ question.totalQuestion }} total
        </strong>
      </template>
      <template v-slot:topLeft>
        <Answer/>
      </template>
    </Question>

    <TimeCountDown class="py-2" />
    <Answers />
  </div>
</template>

<script>
import Answers from "@/components/Answers";
import Answer from "@/components/participate/ask/Answer";
import Question from "@/components/Question";
import TimeCountDown from "@/components/TimeCountDown";


import { mapState } from "vuex";

export default {
  components: {
    Question,
    TimeCountDown,
    Answers,
    Answer,
  },
  computed: mapState({
    question: (state) => state.question,
  }),

};
</script>

<style>
</style>