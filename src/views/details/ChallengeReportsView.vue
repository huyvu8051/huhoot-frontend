<template>
  <h-flex-layout>
    <ChallengeCard :challenge="challenge" />
    <ChallengeReports
      title="Bảng xếp hạng"
      :options.sync="options"
      :desserts="desserts"
      :totalDesserts="totalDesserts"
    >
    </ChallengeReports>
  </h-flex-layout>
</template>

<script>
import ChallengeReports from "@/components/ChallengeReports";
import ChallengeCard from "@/components/ChallengeCard";
import DetailsService from "@/services/DetailsService";
export default {
  components: {
    ChallengeReports,
    ChallengeCard,
  },
  data() {
    return {
      options: {},
      desserts: [],
      totalDesserts: 0,
      challenge: {
        id: 0,
        coverImage: null,
        title: "Tiêu đề cuộc thi",
        createdDate: 0,
        createdBy: "people",
        modifiedDate: 0,
        modifiedBy: "people",
        owner: "people",
        randomAnswer: true,
        randomQuest: false,
        challengeStatus: "WAITING",
      },
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
  created() {},
  methods: {
    getDataFromApi() {
      var body = Object.assign(
        {
          challengeId: this.$route.params.challengeId,
        },
        this.options
      );

      DetailsService.getChallengeReports(body).then((res) => {
        this.desserts = res.data.topStudents.list;
        this.totalDesserts = res.data.topStudents.totalElements;
        this.challenge = res.data.challengeResponse;

        console.log(this.challenge);
      });
    },
  },
};
</script>

<style>
</style>