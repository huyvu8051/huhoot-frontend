<template>
  <div>
    <Question>
      <template v-slot:topRight>
        <strong>
          Câu hỏi: {{ question.questionOrder }} of {{ question.totalQuestion }}
          <br />Đã trả lời: {{ $store.state.studentAnswered }}
        </strong>
      </template>
      <template v-slot:topLeft>
        <Skip />
      </template>
    </Question>

    <TimeCountDown class="py-2" />
    <Answers disable />
  </div>
</template>

<script>
import Question from "@/components/Question";
import Answers from "@/components/Answers";
import Skip from "@/components/organize/ask/Skip";
import TimeCountDown from "@/components/TimeCountDown";

import HostOrganizeService from "@/services/HostOrganizeService";

import { mapState } from "vuex";

export default {
  components: {
    Question,
    TimeCountDown,
    Skip,
    Answers,
  },
  computed: mapState({
    question: (state) => state.question,
  }),
};
</script>

<style>
</style>