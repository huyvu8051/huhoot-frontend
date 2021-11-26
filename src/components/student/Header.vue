<template>
  <v-app-bar app flat hide-on-scroll>
    <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
      <span>Huhoot</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn elevation="2" small class="primary white--text">{{ $store.state.username }}</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
   
  }),
  components: {
  },
  methods: {
    drawer() {
      this.$eventBus.$emit("drawer");
    },
  },
};
</script>

<style></style>
