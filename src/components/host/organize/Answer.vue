<template>
  <v-col
    cols="12"
    xs="12"
    sm="6"
    md="6"
    lg="6"
    xl="6"
    class="pa-3 d-flex flex-column" 
    
  >
    <v-card
      flat
      tile
      class="lighten-1 white--text text-center"
    >
    <v-card class="elevation-5 flex d-flex flex-column">

          <v-card-text class="flex">
            <div class="body-1">{{ answer.answerContent }}</div>
          </v-card-text>
        </v-card>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    answer: Object,
  },
  data: () => ({}),
  created() {},
  methods: {},
};
</script>

<style>
</style>