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
    <v-card-text ref="card" class="d-flex justify-center">
      <VueApexCharts
        class="chart"
        type="pie"
        :width="chartWidth"
        :options="chartOptions"
        :series="series"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import ShowTopStudent from "@/components/organize/show/ShowTopStudent";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    ShowTopStudent,
    VueApexCharts,
  },
  data() {
    return {
      chartWidth: 200,
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Correct", "Wrong", "No Answer"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      totalStudent: 0,
      totalStudentCorrect: 0,
      totalStudentWrong: 0,
    };
  },
  created() {
    this.totalStudent = this.$store.state.totalStudent;
    this.totalStudentCorrect = this.$store.state.totalStudentCorrect;
    this.totalStudentWrong = this.$store.state.totalStudentWrong;

    this.series.push(this.totalStudentCorrect)
    this.series.push(this.totalStudentWrong)
    this.series.push(this.totalStudent - this.totalStudentCorrect - this.totalStudentWrong)

    console.log(this.totalStudentCorrect, this.totalStudentWrong);

    window.addEventListener("resize", this.resizeWindowEventHandler);
  },

  beforeDestroy() {
    clearInterval(this.interval);
    window.removeEventListener("resize", this.resizeWindowEventHandler);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
    this.resizeWindowEventHandler({});
  },
  methods: {
    resizeWindowEventHandler(e) {
      this.chartWidth = this.$refs.card.clientWidth * 0.5;
     // console.log(this.$refs.card.clientWidth);
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.chart {
  text-align: left;
}
</style>