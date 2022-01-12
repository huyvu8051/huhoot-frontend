<template>
  <v-main>
    <WaitingRoomHeader :NumOfStudent="students.length" :challenge="challenge" />
    <v-container fluid rounded-lg>
      <v-layout align-center justify-center>
        <v-row>
          <v-col>
            <StudentInWaitingRoom
              :student="item"
              v-for="(item, index) in students"
              :key="index"
            />
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import WaitingRoomHeader from "@/components/organize/wait/WaitingRoomHeader";
import StudentInWaitingRoom from "@/components/organize/wait/StudentInWaitingRoom";

import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  components: {
    WaitingRoomHeader,
    StudentInWaitingRoom,
  },
  props: {
    challenge: Object,
  },
  data: () => {
    return {
      students: [],
      updateStudentsLoginInterval: {},
    };
  },
  created() {
    //this.updateStudentsLogin();
    this.registEventBus();
  },
  beforeDestroy() {
    clearInterval(this.updateStudentsLoginInterval);
    this.$eventBus.$off("kickStudent");
  },
  methods: {
    registEventBus() {
      this.$eventBus.$on("kickStudent", (data) => {
        HostOrganizeService.kickStudent({
          studentIds: data,
          challengeId: this.$route.query.challengeId,
        });

        this.students = this.students.filter(
          (e) => !data.includes(e.studentId)
        );

        // console.log(this.students);
      });
    },

    updateStudentsLogin() {
      this.getStudentsLogin(); // run first time

      this.updateStudentsLoginInterval = setInterval(
        this.getStudentsLogin,
        5000
      );
    },
    getStudentsLogin() {
      HostOrganizeService.getStudentsOnline({
        challengeId: this.$route.query.challengeId,
      }).then((response) => {
        //console.log(response);
        this.students = response.data;
      });
    },
  },
};
</script>

<style>
</style>