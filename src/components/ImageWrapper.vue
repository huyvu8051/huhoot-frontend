<template>
  <v-img
    :lazy-src="require(`@/assets/img/hutech-logo.png`)"
    :src="$backendUrl + '/uploads/' + src"
    :height="height"
    :width="width"
    class="my-1 rounded"
    v-on:error="src = require(`@/assets/img/hutech-logo.png`)"
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
  },
};
</script>

<style>
</style>