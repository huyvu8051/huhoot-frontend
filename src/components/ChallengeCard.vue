<template>
  <v-card class="elevation-0 text-left">
    <v-img
      height="200px"
      class="white--text align-end"
      :src="challenge.coverImage"
    >
      <v-card-title>{{ challenge.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Mã cuộc thi: {{ challenge.id }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      Người sở hữu: {{ challenge.ower }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <h-is-random-answers :value="challenge.randomAnswer" />
      <h-is-random-questions :value="challenge.randomQuest" />
      <h-date-formater before="Ngày tạo: " :date="challenge.createdDate" />
      <div>Tạo bởi: {{ challenge.createdBy }}</div>
      <h-date-formater before="Ngày sửa: " :date="challenge.modifiedDate" />
      <div>Sửa bởi: {{ challenge.modifiedBy }}</div>

      <h-status-icon :item="challenge" />
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text> Share </v-btn>

      <v-btn color="orange" text> Explore </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    challenge: {
      type: Object,
      default: () => ({
        id: 0,
        coverImage: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Tiêu đề cuộc thi",
        createdDate: 0,
        createdBy: "Created by people",
        modifiedDate: 0,
        modifiedBy: "Modified by people",
        ower: "Owner by people",
        randomAnswer: true,
        randomQuest: false,
        challengeStatus: "WAITING",
      }),
    },
  },
};
</script>

<style>
</style>