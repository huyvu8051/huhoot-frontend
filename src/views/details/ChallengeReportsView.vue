<template>
  <h-flex-layout>
    <ChallengeCard />
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
        this.desserts = res.data.list;
        this.totalDesserts = res.data.totalElements;
      });
    },
  },
};
</script>

<style>
</style>