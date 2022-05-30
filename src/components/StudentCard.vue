<template>
  <v-card class="elevation-0 text-left">
    <v-img
      height="200px"
      src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
    >
      <!-- <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon> -->

      <v-toolbar-title class="text-h6 white--text pl-0">
        Thông tin sinh viên
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->

      <v-card-title class="white--text mt-8">
        <v-avatar size="56">
          <img
            alt="user"
            src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
          />
        </v-avatar>
        <p class="ml-3">{{ student.fullName }}</p>
      </v-card-title>
    </v-img>

    <v-card-title>Mã số sinh viên: {{ student.username }}</v-card-title>

    <v-card-text>
      <h-is-non-locked class="mb-4" :value="student.isNonLocked" />
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        >
        </v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

      <h-date-formater before="Ngày tạo: " :date="student.createdDate" />
      <div>Tạo bởi: {{ student.createdBy }}</div>
      <h-date-formater before="Ngày sửa: " :date="student.modifiedDate" />
      <div>Sửa bởi: {{ student.modifiedBy }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  data: () => ({}),
  created() {},
};
</script>