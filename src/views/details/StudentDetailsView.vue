<template>
  <h-flex-layout>
    <StudentCard :student="student" />
    <ListChallenge
      title="Danh sách cuộc thi tham gia"
      :options.sync="options"
      :desserts="desserts"
      :totalDesserts="totalDesserts"
    >
    </ListChallenge>
  </h-flex-layout>
</template>

<script>
import StudentCard from "@/components/StudentCard";
import ListChallenge from "@/components/ListChallenge";

import DetailsService from "@/services/DetailsService";
export default {
  components: {
    ListChallenge,
    StudentCard,
  },
  data() {
    return {
      options: {},
      student: {},
      desserts: [],
      totalDesserts: 0,
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  created() {
    DetailsService.getStudentDetails(this.$route.params.username).then(
      (res) => {
        this.student = res.data;
        
      }
    );
  },
  methods: {
    getDataFromApi() {
      var body = Object.assign(
        {
          username: this.$route.params.username,
        },
        this.options
      );

      DetailsService.getAllChallengeParticipateIn(body).then((res) => {
        this.desserts = res.data.list;
        this.totalDesserts = res.data.totalElements;
      });
    },
  },
};
</script>

<style>
</style>