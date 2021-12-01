<template>
  <v-app>
    <router-view />
    <Nofication />
  </v-app>
</template>

<script>
import Nofication from "@/components/Nofication";

export default {
  name: "App",
  components: {
    Nofication,
  },
  data: () => ({}),
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
