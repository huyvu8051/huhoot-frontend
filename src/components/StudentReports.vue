<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :options.sync="options2"
    :server-items-length="totalDesserts"
    :loading="loading"
    :footer-props="{
      'items-per-page-options': [
        5,
        10,
        20,
        30,
        50,
        100,
        {
          text: 'All',
          value: 999,
        },
      ],
    }"
    multi-sort
    class=""
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <slot name="topRight" />
      </v-toolbar>
    </template>

    <template #no-data>
      <v-btn color="primary" @click="options2 = Object.assign({}, options2)">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </template>

    <!-- item format -->

    <template #[`item.nav`]="{ item }">
      <h-data-table-router-icon
        icon="poll"
        name="challengeRank"
        :params="{ challengeId: item.id }"
      />
      <h-data-table-router-icon
        icon="group"
        name="participants"
        :params="{ challengeId: item.id }"
      />
    </template>

    <template #[`item.actions`]="{ item }">
      <slot name="actions" :item="item" />
    </template>
    <template #[`item.coverImage`]="{ item }">
      <h-image-data-table :src="item.coverImage" style="margin: 0 auto" />
    </template>

    <template #[`item.createdDate`]="{ item }">
      <h-date-formater :date="item.createdDate" />
    </template>

    <template #[`item.randomAnswer`]="{ item }">
      <h-true-false :condition="item.randomAnswer" />
    </template>

    <template #[`item.challengeStatus`]="{ item }">
      <h-status-icon :item="item" />
    </template>

    <template #[`item.randomQuest`]="{ item }">
      <h-true-false :condition="item.randomQuest" />
    </template>

    <template #[`item.modifiedDate`]="{ item }">
      <h-date-formater :date="item.modifiedDate" />
    </template>
    <template #[`item.owner`]="{ item }">
      <h-route-to-admin-details :username="item.owner" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Danh sách cuộc thi",
    },
    desserts: Array,
    totalDesserts: Number,
    options: Object,
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id", align: "start", sortable: true },

        { text: "Content", align: "center", value: "questionContent" },
        { text: "Ảnh", value: "questionImage" },
        { text: "Ngày tạo", value: "createdDate" },
        { text: "Kiểu trả lời", align: "center", value: "answerOption" },
        { text: "Thời gian trả lời", value: "answerTimeLimit" },
        { text: "Điểm", align: "center", value: "point" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
        { text: "Điều hướng", value: "nav", sortable: false },
        { text: "Hành động", value: "actions", sortable: false },
      ],
      loading: false,
    };
  },
  computed: {
    options2: {
      get() {
        return this.options;
      },
      set(value) {
        this.$emit("update:options", value);
      },
    },
  },
  created() {
    this.$eventBus.$on("api-loading", (data) => {
      this.loading = data;
    });
  },
  beforeDestroy() {
    this.$eventBus.$off("api-loading");
  },
};
</script>

<style>
</style>