<template>
  <QuestionLayout>
    <v-card>
      <v-card-title>
        Rank Table
        <v-spacer></v-spacer>
        <v-btn color="cyan" @click="nextQuestion"><b>Next question</b></v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="desserts"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </QuestionLayout>
</template>

<script>
import HostPlayService from "@/services/HostPlayService";

import QuestionLayout from "@/components/host/organize/QuestionLayout";
export default {
  components: {
    QuestionLayout,
  },
  data() {
    return {
      headers: [
        {
          text: "Rank",
          align: "start",
          sortable: false,
          value: "rank",
        },
        { text: "ID", value: "studentId" },
        { text: "Fullname", value: "studentFullName" },

        { text: "Score", value: "score" },
      ],
      desserts: [],
    };
  },
  created() {
    this.getTopStudent();
  },
  methods: {
    getTopStudent() {
      HostPlayService.getTopStudent({
        challengeId: this.$route.query.challengeId,
      }).then((response) => {
        this.desserts = response.data;
      });
    },
    nextQuestion() {
      this.$router.push({
        name: "host.publishQuestionIntro",
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