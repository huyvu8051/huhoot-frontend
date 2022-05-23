<template>
  <v-card class="mx-auto" flat>
    <v-toolbar color="#262766" style="color: white" dense flat>
      <v-toolbar-title class="text-body-2">
        <slot name="topRight" />
      </v-toolbar-title>
      <v-spacer>
        <v-toolbar-title class="text-body-2">
          <strong>{{ question.answerOption }} </strong>
        </v-toolbar-title>
        <v-toolbar-title class="text-body-2">
          <strong>{{ question.point }} </strong>
        </v-toolbar-title>
      </v-spacer>
      <slot name="topLeft" />
    </v-toolbar>
    <v-card-text>
      <h2>{{ question.questionContent }}</h2>
    </v-card-text>

    <h-fit-height-image :src="question.questionImage" />
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

<style>
</style>