<template>
  <v-main>
    <v-container fluid fill-height rounded-lg>
      <v-layout align-center justify-center>
        <h1>Start challenge</h1>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => {
      return {
          
      }
  },
  mounted() {
    this.requestGetFirstQuestion();
  },
  methods: {
    requestGetFirstQuestion() {
      setTimeout(() => {
        this.$eventBus.$emit("getFirstQuestion");
      }, 2000);
    },
  },
};
</script>

<style>
</style>