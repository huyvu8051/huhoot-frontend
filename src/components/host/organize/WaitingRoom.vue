<template>
  <v-main>
    <WaitingRoomHeader />
    <v-container fluid fill-height rounded-lg>
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

import HostPlayService from "@/services/HostPlayService";

export default {
  components: {
    WaitingRoomHeader,
    StudentInWaitingRoom,
  },
  data: () => {
    return {
      students: [],
      updateStudentsLoginInterval: {},
      challengeId: 0,
    };
  },
  created() {
    this.challengeId = this.$route.params.challengeId;
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
      HostPlayService.getStudentsOnline({
        challengeId: this.challengeId,
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