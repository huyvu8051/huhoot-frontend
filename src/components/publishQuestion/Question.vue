<template>
  <v-card class="mx-auto" flat v-resize @resize="onResize">
    <v-toolbar color="cyan" dense flat>
      <v-toolbar-title class="text-body-2">
        <strong>
          {{ question.ordinalNumber }} of {{ question.totalQuestion }} </strong
        >|
        <strong> {{ studentAnswered }} student answered </strong>
      </v-toolbar-title>
      <v-spacer>
        <v-toolbar-title class="text-body-2">
          <strong>{{ question.answerOption }} </strong>
        </v-toolbar-title>
        <v-toolbar-title class="text-body-2">
          <strong>{{ question.point }} </strong>
        </v-toolbar-title>
      </v-spacer>
      <v-btn color="red" @click="skipQuestion"><b>Skip</b></v-btn>
    </v-toolbar>
    <v-card-text>
      <h2>{{ question.questionContent }}</h2>
    </v-card-text>

    <ImageWrapper :maxHeight="imageHeight" :contain="true" :src="question.questionImage" />
  </v-card>
</template>

<script>
import ImageWrapper from "@/components/ImageWrapper";

export default {
  components: { ImageWrapper },
  props: {
    question: Object,
    studentAnswered: Number,
  },
  data(){
    return{
      imageHeight: "100%"
    }
  },

  methods: {
    skipQuestion() {
      this.$eventBus.$emit("skipQuestion", this.$route.query.questionId);
    },
    onResize(e) {
      this.imageHeight =  window.innerHeight / 3 + "";
      // console.log(this.imageHeight);
    },
  },
};
</script>

<style>
</style>