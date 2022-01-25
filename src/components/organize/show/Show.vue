<template>
  <AnswerResult>
    <template v-slot:showTopStudent>
      <ShowTopStudent/>
    </template>
  </AnswerResult>
</template>

<script>
import AnswerResult from "@/components/answerResult/AnswerResult";
import ShowTopStudent from "@/components/organize/show/ShowTopStudent";

export default {
  components: {
    AnswerResult,
    ShowTopStudent,
  },
};
</script>

<style>
</style>