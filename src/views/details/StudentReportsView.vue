<template>
  <h-flex-layout>
    <StudentCard v-model="student" />
    <StudentReports
      title="Danh sách cuộc thi tham gia"
      :options.sync="options"
      :desserts="desserts"
      :totalDesserts="totalDesserts"
    />
  </h-flex-layout>
</template>

<script>
import StudentCard from "@/components/StudentCard";
import StudentReports from "@/components/StudentReports.vue";
export default {
  components: {
    StudentReports,
    StudentCard,
  },
  data() {
    return {
      options: {},
      student: {
        createdBy: "0",
        createdDate: 0,
        fullName: "0",
        id: 0,
        isNonLocked: true,
        modifiedBy: "0",
        modifiedDate: 0,
        username: "0",
      },
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
          username: this.$route.params.username,
        },
        this.options
      );

      DetailsService.getStudentDetails(body).then((res) => {
        this.desserts = res.data.listChallenge.list;
        this.totalDesserts = res.data.listChallenge.totalElements;
        this.student = res.data.studentDetails;
      });
    },
  },
};
</script>

<style>
</style>