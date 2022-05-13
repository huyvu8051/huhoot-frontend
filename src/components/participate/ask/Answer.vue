<template>
  <v-btn color="green" @click="answer"> <b> Submit </b> </v-btn>
</template>

<script>
import StudentPlayService from "@/services/StudentPlayService";
export default {
  props: {
    selectedIds: Array,
  },
  data: () => {
    return {};
  },
  methods: {
    answer() {
      console.log("answer ", this.selectedIds);

      if (this.selectedIds.length == 0) {
        this.$eventBus.$emit("nofication", {
          message: "Select answer!",
          status: "error",
        });

        return;
      }

      StudentPlayService.sentAnswer({
        answerIds: this.selectedIds,
        questionId: this.$route.query.questionId,
        hashCorrectAnswerIds: this.$store.state.hashCorrectAnswerIds,
        adminSocketId: this.$store.state.adminSocketId,
        comboToken: this.$store.state.comboToken
     
      }).then((response) => {
        this.$store.commit("setHashPointsReceived", response.data.pointsReceived);
        this.$store.commit("setComboToken", response.data.comboToken);
        this.$store.commit("setCombo", response.data.combo);
        // console.log("combo", response.data.combo);
      });
      this.$router.push({
        name: "student.wait",
        query: { challengeId: this.$route.query.challengeId },
      });
    },
  },
};
</script>

<style>
</style>