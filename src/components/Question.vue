
<template>
  <v-card class="mx-auto" flat>
    <v-toolbar color="cyan" dense flat>
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

    <FitHeightImage
      :src="question.questionImage"
    />
  </v-card>
</template>

<script>
import ImageWrapper from "@/components/ImageWrapper";

import FitHeightImage from "@/components/FitHeightImage";
export default {
  components: { ImageWrapper, FitHeightImage },
  props: {
    question: Object,
  },
  data() {
    return {
    };
  },

  methods: {
 
  },
};
</script>

<style>
</style>