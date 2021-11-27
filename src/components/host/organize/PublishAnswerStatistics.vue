<template>
  <QuestionLayout>
    <v-card>
      <v-card-title>
        Statistics
        <v-spacer></v-spacer>
        <v-btn color="cyan" @click="showTopStudent">
          <b> See Rank Table </b>
        </v-btn>
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
          <Answer
            :answer="item"
            v-for="(item, index) in answers"
            :key="index"
          />
        </v-row>
      </v-card-text>
    </v-card>
  </QuestionLayout>
</template>

<script>
import Question from "@/components/student/Question";
import Answer from "@/components/host/organize/Answer";
import AnswerStatistics from "@/components/host/organize/AnswerStatistics";
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
  data: () => ({
    skill: 20,
  }),
  computed: {
    totalAnswer() {
      let total = 0;
      this.answerStatistics.forEach((e) => (total += e.numberOfStudentSelect));
      return total;
    },
  },
  methods: {
    showTopStudent() {
      this.$router.push({
        name: "host.topStudent",
        query: {
          challengeId: this.$route.query.challengeId,
        },
      });
    },
  },
};
</script>

<style>
</style>