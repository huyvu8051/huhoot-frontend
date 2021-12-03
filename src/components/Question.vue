
<template>
  <v-card class="mx-auto" flat v-resize @resize="onResize">
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

    <ImageWrapper
      :maxHeight="imageHeight"
      :contain="true"
      :src="question.questionImage"
    />
  </v-card>
</template>

<script>
import ImageWrapper from "@/components/ImageWrapper";

export default {
  components: { ImageWrapper },
  props: {
    question: Object,
  },
  data() {
    return {
      imageHeight: "100%",
    };
  },

  methods: {
    onResize(e) {
      this.imageHeight = window.innerHeight / 3 + "";
      // console.log(this.imageHeight);
    },
  },
};
</script>

<style>
</style>