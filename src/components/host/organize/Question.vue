<template>
  <v-card class="mx-auto" flat>
    <v-toolbar color="cyan" dense flat>
      <v-toolbar-title class="text-body-2">
        <strong>{{ question.ordinalNumber }} of </strong>
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

    <v-img
      height="100%"
      width="100%"
      :src="question.questionContent"
    />
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    question: Object,
  },
  methods:{
    skipQuestion(){

    }
  }
};
</script>

<style>
</style>