<template>
  <v-app>
    <router-view />
    <h-nofication/>
  </v-app>
</template>

<script>

export default {
  name: "App",
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}
</style>

<style>
.btn-bot {
  position: absolute;
  bottom: 1vmin;

  padding: 0px;
  margin: 0px;

}

.btn-right {
  right: 1vmin;
}

.btn-left {
  left: 1vmin;
}
.v-btn__content {
  padding: 0px;
}
.btn-text {
  font-size: 2.6vmin;
}
</style>
