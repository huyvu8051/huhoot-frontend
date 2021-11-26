<template>
  <v-app-bar app flat bottom class="cyan">
    <v-toolbar-title class="black--text">
      <span>{{ $store.state.username }}</span>
    </v-toolbar-title>
    <v-spacer>
      <v-btn class="green white--text" @click="sentAnswer"> Submit </v-btn>
    </v-spacer>
    <v-btn class="deep-purple white--text" text>
      {{ score }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    score: 0,
  }),
  created() {},
  components: {},
  methods: {
    sentAnswer() {
       this.$eventBus.$emit("sentAnswer");
    },
  },
};
</script>

<style></style>
