<template>
  <div >
    <v-btn dark color="primary" fixed left bottom style="z-index: 1;" >
      {{ $store.state.username }}
    </v-btn>
    <v-btn dark color="primary" fixed right bottom style="z-index: 1;" >
      {{ point }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    point: String,
    submitable: Boolean,
  },
  data: () => ({}),
  components: {},
  methods: {
    sentAnswer() {
      this.$eventBus.$emit("sentAnswer");
    },
  },
};
</script>

<style></style>
