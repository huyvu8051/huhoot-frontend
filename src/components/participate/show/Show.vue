<template>
  <AnswerResult
    :question="question"
    :answers="answers"
    :answerStatistics="answerStatistics"
  >
    <template v-slot:showTopStudent>
      <IsYourAnswerCorrect :isCorrect="isCorrect" />
    </template>
  </AnswerResult>
</template>

<script>
import AnswerResult from "@/components/answerResult/AnswerResult";
import IsYourAnswerCorrect from "@/components/participate/IsYourAnswerCorrect";

import DecryptUtil from "@/services/DecryptUtil";

export default {
  components: {
    AnswerResult,
    IsYourAnswerCorrect,
  },
  props: {
    question: Object,
    answers: Array,
    answerStatistics: Array,
    isCorrectEncrypt: String,
    totalPointEncrypt: String,
    encryptKey: String,
  },
  data: () => {
    return {
      isCorrect: null,
    };
  },

  created() {
    this.isCorrect = DecryptUtil.encryptResponse(
      this.isCorrectEncrypt,
      this.encryptKey
    );
    console.log("show answer", this.isCorrect);

    var totalPoint = DecryptUtil.encryptResponse(
      this.totalPointEncrypt,
      this.encryptKey
    );

    if (!isNaN(totalPoint) && totalPoint != "") {
      this.$eventBus.$emit("setTotalPoint", totalPoint);
    }
  },
  methods: {},
};
</script>

<style>
</style>