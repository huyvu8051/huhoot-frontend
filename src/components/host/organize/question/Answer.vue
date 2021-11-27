<template>
  <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
    <v-card>
      <v-btn
        min-height="60"
        width="100%"
        color="black lighten-2"
        text
        v-bind:class="{ green: answer.correct}"
      >
        <b>{{ answer.answerContent }}</b>
      </v-btn>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    answer: Object,
  },
  data: () => ({
  }),
  created() {
  },
  methods: {
   
  },
};
</script>

<style>
</style>