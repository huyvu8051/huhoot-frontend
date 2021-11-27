<template>
  <v-app-bar app flat bottom class="cyan">
    <v-toolbar-title class="black--text">
      <span>{{ $store.state.username }}</span>
    </v-toolbar-title>
    <v-spacer>
      <v-btn class="green white--text" @click="sentAnswer" v-if="submitable">
        Submit
      </v-btn>
    </v-spacer>
    <v-btn class="deep-purple white--text" text>
      {{ point }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    point: Number,
    submitable: Boolean
  },
  data: () => ({
  }),
  components: {},
  methods: {
    sentAnswer() {
      this.$eventBus.$emit("sentAnswer");
    },
  },
};
</script>

<style></style>
