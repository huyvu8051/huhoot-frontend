<template>
  <v-flex xs12 sm12 md12>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :options.sync="options"
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
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>List Challenge</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <DeleteChallengeDialog
            v-model="deleteDialog"
            :item="editedItem"
          />
          <EditChallengeDialog
          v-model="editDialog"
          :item="editedItem"
          />
          <CreateChallengeDialog />
        </v-toolbar>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="getDataFromApi()"> Reset </v-btn>
      </template>

      <!-- item format -->

      <template v-slot:[`item.actions`]="{ item }">
        <DataTableRouterIcon
          icon="poll"
          name="host.rank"
          :query="{ challengeId: item.id }"
        />
        <DataTableRouterIcon
          icon="view_list"
          name="host.listQuestion"
          :query="{ challengeId: item.id }"
        />
        <DataTableRouterIcon
          icon="group"
          name="host.listStudentInChallenge"
          :query="{ challengeId: item.id }"
        />

        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)"> delete </v-icon>
        <OpenChallenge :challengeId="item.id" />

        <DataTableRouterIcon
          icon="play_arrow"
          name="host.wait"
          :query="{ challengeId: item.id }"
        />
      </template>

      <template v-slot:[`item.coverImage`]="{ item }">
        <ImageDataTable :src="item.coverImage" />
      </template>
      <template v-slot:[`item.createdDate`]="{ item }">
        <DateFormater :date="item.createdDate" />
      </template>
      <template v-slot:[`item.modifiedDate`]="{ item }">
        <DateFormater :date="item.modifiedDate" />
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import HostManageService from "@/services/HostManageService";
import EditChallengeDialog from "@/components/host/challenge/EditChallengeDialog";

import CreateChallengeDialog from "@/components/host/challenge/CreateChallengeDialog";

import ConfirmDialog from "@/components/ConfirmDialog";
import DeleteChallengeDialog from "@/components/host/challenge/DeleteChallengeDialog";
import ImageDataTable from "@/components/ImageDataTable";
import DateFormater from "@/components/DateFormater";
import OpenChallenge from "@/components/host/challenge/OpenChallenge";

import ImageWrapper from "@/components/ImageWrapper";
import DataTableRouterIcon from "@/components/DataTableRouterIcon";


export default {
  components: {
    DateFormater,
    ImageDataTable,
    ImageWrapper,
    OpenChallenge,
    DataTableRouterIcon,
    EditChallengeDialog,
    DeleteChallengeDialog,
    ConfirmDialog,
    CreateChallengeDialog
  },
  // data
  data: () => ({
   
    dialog: false,
    deleteDialog: false,
    editDialog:false,

    headers: [
      { text: "Id", value: "id", align: "start", sortable: true },
      { text: "Title", value: "title" },
      { text: "Cover", value: "coverImage" },
      { text: "Created date", value: "createdDate" },
      { text: "Modified date", value: "modifiedDate" },
      // { text: "Owner", value: "owner" },
      { text: "Random answer", value: "randomAnswer" },
      { text: "Random quest", value: "randomQuest" },
      { text: "Status", value: "challengeStatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedItem:{},

    totalDesserts: 0,
    loading: true,
    options: {},
  }),

  watch: {

    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },

  created() {
    this.$eventBus.$on("api-loading", (data) => {
      this.loading = data;
    });
    this.$eventBus.$on("reloadData", () => {
      this.getDataFromApi();
    });
  },

  methods: {
    deleteItem(item) {
      this.clone(item);
      this.deleteDialog = true;
    },

    // =========================
    editItem(item) {
       this.clone(item);
      this.editDialog = true;
    },

    clone(item){
       this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    //===================================================
    getDataFromApi() {
      //  console.log(this.options);
      HostManageService.findAllChallenge(this.options)
        .then((response) => {
          // console.log(response.data);
          this.desserts = response.data.list;
          this.totalDesserts = response.data.totalElements;
        })
        .catch(console.log);
    },
  },
};
</script>