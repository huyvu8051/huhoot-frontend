<template>
  <h-flex-layout>
    <Participants
      :options.sync="options"
      :desserts="desserts"
      :totalDesserts="totalDesserts"
    />
  </h-flex-layout>
</template>

<script>
import Participants from "@/components/Participants";

import DetailsService from "@/services/DetailsService";

export default {
  components: {
    Participants,
  },
  // validate

  // data
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

  methods: {
    getDataFromApi() {
      var body = Object.assign(
        {
          challengeId: this.$route.params.challengeId,
        },
        this.options
      );

      DetailsService.getAllParticipants(body).then((res) => {
        this.desserts = res.data.list;
        this.totalDesserts = res.data.totalElements;
      });
    },
  },
};
</script>