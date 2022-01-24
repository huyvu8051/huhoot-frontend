<template>
  <div>
    <v-btn dark color="primary" fixed left bottom style="z-index: 1">
      {{ $store.state.username }}
    </v-btn>
    <v-btn dark color="primary" fixed right bottom style="z-index: 1">
      {{ totalPoints }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    totalPoints: 0,
  }),
  components: {},
  created() {
    this.$eventBus.$on("updateTotalPoints", () => {
      var totalPoints = this.$store.state.totalPoints;
      this.totalPoints = parseInt(totalPoints);
    });
  },
  beforeDestroy() {
    this.$eventBus.$off("updateTotalPoints");
  },
};
</script>

<style></style>
