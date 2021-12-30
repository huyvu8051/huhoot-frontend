<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
    :multi-line="true"
    centered
  >
    <v-layout align-center pr-4>
      <v-icon class="pr-3" dark large>{{ icon }}</v-icon>
      <v-layout column>
        <h1>{{ message }}</h1>
      </v-layout>
    </v-layout>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" icon v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    isCorrect: String,
  },
  data() {
    return {
      snackbar: false,
      message: "",
      timeout: 1000,
      color: "success",
      icon: "check_circle",
    };
  },
  created() {
    //this.snackbar = true;
    switch (this.isCorrect) {
      case "true":
        this.$swal({
          icon: "success",
          title: "Good job!",
          text: "Your answer is correct!",
          timer: 3000,
        });

        break;
      case "false":
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Incorrect answer!",
          timer: 3000,
        });
        break;
      default:
        this.$swal({
          icon: "warning",
          title: "Timeout",
          text: "Better luck next time!",
          timer: 3000,
        });
        break;
    }
  },
};
</script>

<style>
</style>