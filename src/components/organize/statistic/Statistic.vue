<template>
  <v-card class="mx-auto" flat>
    <v-toolbar color="cyan" dense flat>
      <v-toolbar-title class="text-body-2">
        <slot name="topRight" />
      </v-toolbar-title>
      <v-spacer>
        <v-toolbar-title class="text-body-2">
          <strong> Statistic </strong>
        </v-toolbar-title>
      </v-spacer>
      <ShowTopStudent />
    </v-toolbar>
    <v-card-text>
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="value"
        color="teal"
      >
        {{ totalStudentCorrect }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="value"
        color="primary"
      >
        {{ totalStudentWrong }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="90"
        :size="100"
        :width="15"
        :value="value"
        color="red"
      >
        {{ totalStudent - totalStudentCorrect - totalStudentWrong }}
      </v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
import ShowTopStudent from "@/components/organize/show/ShowTopStudent";

export default {
  components: {
    ShowTopStudent,
  },
  data() {
    return {
      interval: {},
      value: 0,
      totalStudent: 0,
      totalStudentCorrect: 0,
      totalStudentWrong: 0
    };
  },
  created(){
      this.totalStudent = this.$store.state.totalStudent
      this.totalStudentCorrect = this.$store.state.totalStudentCorrect
      this.totalStudentWrong =  this.$store.state.totalStudentWrong
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>