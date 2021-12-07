<template>
  <h1>{{ text }}</h1>
</template>

<script>
export default {
  data: () => {
    return {
      interval: {},
      text: "Waiting",
      counter: 0,
    };
  },
  created() {
    this.interval = setInterval(() => {

      this.text = "Waiting"


      this.counter = (this.counter + 1) % 4;
      for(var i = 0; i < this.counter; i++){
          this.text += "."
      }

      
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style>
</style>