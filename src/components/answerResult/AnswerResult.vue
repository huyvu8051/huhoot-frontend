<template>
  <QuestionLayout>
    <v-card>
      <v-card-title>
        Statistics
        <v-spacer></v-spacer>
        <slot name="showTopStudent" />
      </v-card-title>
      <v-card-text>
        <AnswerStatistics
          :answerStatistic="item"
          :totalStudentAnswer="totalAnswer"
          v-for="(item, index) in answerStatistics"
          :key="index"
        />
      </v-card-text>
      <v-card-text>
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
            <v-card
              outlined
              class="flex d-flex flex-column"
              v-bind:class="{ green: i.isCorrect }"
            >
              <v-card-text class="flex">
                <b>{{ i.answerContent }}</b>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </QuestionLayout>
</template>

<script>
import Question from "@/components/student/Question";
import Answer from "@/components/host/organize/Answer";
import AnswerStatistics from "@/components/answerResult/AnswerStatistics";
import QuestionLayout from "@/components/host/organize/QuestionLayout";

export default {
  components: {
    Question,
    Answer,
    AnswerStatistics,
    QuestionLayout,
  },
  props: {
    question: Object,
    answers: Array,
    answerStatistics: Array,
  },
  computed: {
    totalAnswer() {
      let total = 0;
      this.answerStatistics.forEach((e) => (total += e.numberOfStudentSelect));
      return total;
    },
  },
 
  
};
</script>

<style>
</style>