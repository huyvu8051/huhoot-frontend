<template >
  <v-img
    :lazy-src="require(`@/assets/img/huhoot-logo.png`)"
    :src="url"
    :height="height"
    :width="width"
    :contain="contain"
    v-on:error="url = require(`@/assets/img/huhoot-logo.png`)"
 
  />
</template>

<script>
export default {
  props: {
    src: String,
    height: {
      type: String,
      default: "auto",
    },

    width: {
      type: String,
      default: "auto",
    },
  
    contain: {
      type: Boolean,
      default: false,
    },
  
  },
  data: () => {
    return {
      url: "",
    };
  },
  computed: {},
  watch: {
    src(val) {
      this.url = "http://192.168.1.5:8081" + "/uploads/" + val;
      // console.log(this.url);
    },
  },
  created() {
    this.url = "http://192.168.1.5:8081" + "/uploads/" + this.src;
  },
  
};
</script>

<style>
</style>