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
export default {
  components: {
    Question,
    TimeCountDown,
    Answer,
  },
 

  data: () => {
    return {
      cloneAnswers: [],
      answers:[],
      question:{}
    };
  },
  created() {

    this.answers = this.$store.state.answers;
    this.question = this.$store.state.question;

    // prevent modify father props
    this.cloneAnswers = this.answers.map((e) =>
      Object.assign({ selected: false }, e)
    );
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
    doFinish() {
      this.$router
        .push({
          name: "student.wait",
          query: {
            challengeId: this.$route.query.challengeId,
          },
        })
        .catch((err) => err);
    },
  },
};
</script>

<style>
</style>