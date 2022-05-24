<template>
  <v-card flat>
    <div class="quest-content">
      <h2>{{ question.questionContent }}</h2>
    </div>
    <h-image-wrapper contain height="28vh" :src="question.questionImage" />
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    question: (state) => state.question,
  }),
};
</script>

<style scoped>
.quest-content {
  height: 15vh;
  line-height: normal;
  font-size: 2.7vmin;
  /* background-color: rgba(158, 158, 158, 0.445); */

  


  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>