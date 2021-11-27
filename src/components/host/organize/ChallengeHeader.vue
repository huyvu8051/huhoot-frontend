<template>
  <v-app-bar app flat hide-on-scroll class="cyan">
    <v-toolbar-title class="black--text">
      <span>{{ $store.state.username }}</span>
    </v-toolbar-title>
    <v-spacer>
      <v-btn class="green white--text" @click="sentAnswer" v-if="submitable"> Submit </v-btn>
    </v-spacer>
    <v-btn class="deep-purple white--text" text>
      {{ score }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    score: 0,
    submitable: false
  }),
  created() {
    this.$eventBus.$on("updateScore", (data) => {
      this.score = data;
    });

    this.$eventBus.$on("submitable",(data)=>{
      this.submitable = data;
    });



  },
  components: {},
  methods: {
    sentAnswer() {
      this.submitable = false;
      this.$eventBus.$emit("sentAnswer");
    },
  },
};
</script>

<style></style>
