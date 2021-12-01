<template>
  <v-main>
    <WaitingRoomHeader :NumOfStudent="students.length" />
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
import WaitingRoomHeader from "@/components/host/organize/WaitingRoomHeader";
import StudentInWaitingRoom from "@/components/host/organize/StudentInWaitingRoom";

import HostOrganizeService from "@/services/HostOrganizeService";

export default {
  components: {
    WaitingRoomHeader,
    StudentInWaitingRoom,
  },
  data: () => {
    return {
      students: [],
      updateStudentsLoginInterval: {},
    };
  },
  created() {
    this.updateStudentsLogin();
  },
  destroyed() {
    clearInterval(this.updateStudentsLoginInterval);
  },
  methods: {
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
        // console.log(response);
        this.students = response.data;
      });
    },
  },
};
</script>

<style>
</style>