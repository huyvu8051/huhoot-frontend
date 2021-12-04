<template>
  <div>
    <v-progress-linear v-model="value" color="yellow" height="25">
      <template v-slot:default="">
        <strong>{{  }}</strong>
      </template>
    </v-progress-linear>
    <br />
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      progressTime: 3,
      value: 0,
      interval: 0,
    };
  },


  mounted() {
    this.startBuffer();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    startBuffer() {
      this.value +=  (100 / this.progressTime) / 5;
      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.value +=  (100 / this.progressTime) / 10;
        
      }, 1000 / 10);
    },
  },
};
</script>