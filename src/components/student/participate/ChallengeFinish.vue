<template>
  <v-main>
    <v-container fluid rounded-lg>
      <h1>Challenge finish</h1>
      <v-layout align-center justify-center>
        <v-btn
          :to="{
            name: 'STUDENT',
          }"
          color="green"
          class="white--text"
        >
          <b>Return home</b>
        </v-btn>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
</style>