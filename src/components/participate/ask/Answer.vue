<template>
  <v-btn color="green" :disabled="disable" @click="answer"> <b> Submit </b> </v-btn>
</template>

<script>
import StudentPlayService from "@/services/StudentPlayService";
export default {
  props: {
    selectedIds: Array,
  },
  data: () => {
    return {
      disable: false
    };
  },
  methods: {
    answer() {
      // console.log("answer ", this.selectedIds);

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
        adminSocketId: this.$store.state.adminSocketId,
        comboToken: this.$store.state.comboToken,
        questionToken: this.$store.state.questionToken,
     
      }).then((response) => {
        
        this.$store.commit("saveStudentAnswerResponse", response.data);
 
      });

      this.disable = true;
      this.$eventBus.$emit('answered');
      // this.$router.push({
      //   name: "student.wait",
      //   query: { challengeId: this.$route.query.challengeId },
      // });
    },
  },
};
</script>

<style>
</style>