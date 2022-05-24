<template>
  <div>
    <Question style="height: 43vh" />
    <Answer />
    <TimeCountDown class="my-2" style="height: 4vh" />
    <Answers style="height: 43vh" />
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