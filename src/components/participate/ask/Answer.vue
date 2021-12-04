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

      if(this.selectedIds.length == 0){
        this.$eventBus.$emit("nofication", {
          message:"Select answer!",
          status:"error"
        })

        return;
      }

      StudentPlayService.sentAnswer({
        answerIds: this.selectedIds,
        challengeId: this.$route.query.challengeId,
        questionId: this.$route.query.questionId,
      }).then((response) => {
        this.$eventBus.$emit("storeEncrypted", response.data);

        this.$router.push({
          name: "student.wait",
          query: { challengeId: this.$route.query.challengeId },
        });
      });
    },
  },
};
</script>

<style>
</style>