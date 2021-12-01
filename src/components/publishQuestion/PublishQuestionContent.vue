<template>
  <QuestionLayout :studentAnswered="studentAnswered">

    <Question :question="question" :studentAnswered="studentAnswered" />
    

    <TimeCountDown class="py-2" />

    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
        class="pa-3 d-flex flex-column"
        v-for="i in answers"
        :key="i.id"
      >
        <v-card  outlined class="flex d-flex flex-column" v-bind:class="{ green: i.correct }">
          <v-card-text class="flex" >
            <b>{{ i.answerContent }}</b>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </QuestionLayout>
</template>

<script>
import Question from "@/components/publishQuestion/Question";
import Answer from "@/components/host/organize/Answer";
import TimeCountDown from "@/components/host/organize/TimeCountDown";
import QuestionLayout from "@/components/host/organize/QuestionLayout";
export default {
  components: {
    Question,
    Answer,
    TimeCountDown,
    QuestionLayout,
  },
  props: {
    question: Object,
    answers: Array,
    studentAnswered: Number,
  },
  mounted() {
    this.$eventBus.$emit("countDown", {
      answerTime: this.question.answerTimeLimit,
      askDate: this.question.askDate,
    });
  },
  destroyed() {
    this.$eventBus.$emit("countDown", {
      answerTime: 0,
      askDate: this.question.askDate,
    });
  },
  methods: {
    registSocket() {},
  },
};
</script>

<style>
</style>