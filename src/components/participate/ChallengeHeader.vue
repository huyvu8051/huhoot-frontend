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
  computed: {
    totalPoints() {
      return parseInt(this.$store.state.totalPoints);
    },
  }
};
</script>

<style></style>
