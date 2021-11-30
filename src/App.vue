<template>
  <v-app>
    <router-view />
    <Nofication />
  </v-app>
</template>

<script>
import Nofication from "@/components/Nofication";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

import Parallax from "@/components/Parallax";
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
  name: "App",
  components: {
    Nofication,
    Navigation,
    Header,
    Footer,
    Particles,
    Parallax,
    Breadcrumbs
  },
  data: () => ({
    
  }),
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
