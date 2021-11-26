<template >
  <div v-html="formatDate(date)" />
</template>


<script>
export default {
  props: {
    date: String,
  },
  methods: {
    formatDate(s) {
      var date = new Date(s);
      return date.toLocaleString();
    },
  },
};
</script>

<style>
</style>