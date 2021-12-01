<template>
  <v-card class="mx-auto" flat>
    <v-toolbar color="pink" dense flat>
      <v-toolbar-title class="text-body-2">
        <strong>{{ question.ordinalNumber }} of </strong>
      </v-toolbar-title>
      <v-spacer>
        <v-toolbar-title class="text-body-2">
          <strong>{{ question.answerOption }} </strong>
        </v-toolbar-title>
      </v-spacer>
      <v-toolbar-title class="text-body-2">
        <strong>{{ question.point }} </strong>
      </v-toolbar-title>
    </v-toolbar>

    <v-img height="100%" width="100%" max-height="500px" :src="question.questionContent" />
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    question: Object,
  },
};
</script>

<style>
</style>