<template>
  <v-row>
    <v-col
      cols="12"
      xs="12"
      sm="6"
      class="pa-3 d-flex flex-column"
      v-for="i in answers"
      :key="i.id"
    >
      <v-card
        outlined
        class="flex d-flex flex-column"
        v-bind:class="{ green: i.isCorrect }"
      >
        <v-card-text class="flex">
          <b>{{ i.content }}</b>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data(){
    return {
      answers: []
    }
  },
  created(){
    this.answers = this.$store.state.answers;
  }
};
</script>

<style>
</style>