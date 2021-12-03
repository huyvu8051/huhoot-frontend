<template>
  <v-btn class="ma-1" :class="{ 'text-decoration-line-through': onHover }">
    <b
      @mouseover="onHover = true"
      @mouseleave="onHover = false"
      @click="kickStudent"
    >
      {{ student.studentId + " " + student.studentFullName }}
    </b>
  </v-btn>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  data: () => {
    return {
      onHover: false,
    };
  },
  methods: {
    kickStudent() {
      console.log(
        "kick student id: ",
        this.student.studentId,
        this.student.studentFullname
      );
    },
  },
};
</script>

<style>
</style>