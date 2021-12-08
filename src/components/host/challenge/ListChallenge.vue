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
      disable-sort
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>List Challenge</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.title"
                        label="Title"
                        counter="255"
                        :error-messages="titleErrors"
                        required
                        @input="$v.editedItem.title.$touch()"
                        @blur="$v.editedItem.title.$touch()"
                      >
                      </v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-switch
                        v-model="editedItem.randomAnswer"
                        label="Random Answer"
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-switch
                        v-model="editedItem.randomQuest"
                        label="Random Question"
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        :items="challengeStatus"
                        v-model="editedItem.challengeStatus"
                        label="Challenge status"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-file-input
                        name="image"
                        accept="image/*"
                        label="Upload image"
                        @change="uploadFile"
                        show-size
                      >
                      </v-file-input>
                    </v-col>
                    <v-col>
                      <p>Challenge cover</p>
                      <ImageWrapper :src="editedItem.coverImage" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
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

        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <OpenChallenge :challengeId="item.id" />
        <!-- <DataTableRouterIcon
          icon="play_arrow"
          name="waitingRoom"
          :query="{ challengeId: item.id }"
        /> -->
        <v-icon small class="mr-2" @click="play(item)"> play_arrow </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getDataFromApi()"> Reset </v-btn>
      </template>
      <template v-slot:[`item.coverImage`]="{ item }">
        <ImageDataTable :src="item.coverImage" />
      </template>
      <template v-slot:[`item.createdDate`]="{ item }">
        <DateFormater :date="item.createdDate" />
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import HostManageService from "@/services/HostManageService";
import HostOrganizeService from "@/services/HostOrganizeService";

import ImageDataTable from "@/components/ImageDataTable";
import DateFormater from "@/components/DateFormater";
import OpenChallenge from "@/components/host/challenge/OpenChallenge";

import ImageWrapper from "@/components/ImageWrapper";
import DataTableRouterIcon from "@/components/DataTableRouterIcon";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  components: {
    DateFormater,
    ImageDataTable,
    ImageWrapper,
    OpenChallenge,
    DataTableRouterIcon,
  },
  // validate
  mixins: [validationMixin],
  validations: {
    editedItem: {
      title: { required, maxLength: maxLength(255) },
    },
  },

  // data
  data: () => ({
    challengeStatus: ["BUILDING", "WAITING", "IN_PROGRESS", "LOCKED", "ENDED"],
    answerOption: ["SINGLE_SELECT", "MULTI_SELECT"],
    point: ["STANDARD", "DOUBLE_POINTS", "NO_POINTS"],
    radioGroup: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id", align: "start", sortable: true },
      { text: "Title", value: "title" },
      { text: "Cover", value: "coverImage" },
      { text: "Created date", value: "createdDate" },
      { text: "Owner", value: "owner" },
      { text: "Random answer", value: "randomAnswer" },
      { text: "Random quest", value: "randomQuest" },
      { text: "Status", value: "challengeStatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      title: "",
      coverImage: "huhoot-logo.png",
      randomAnswer: false,
      randomQuest: false,
      challengeStatus: "BUILDING",
    },
    defaultItem: {
      id: 0,
      title: "",
      coverImage: "huhoot-logo.png",
      randomAnswer: false,
      randomQuest: false,
      challengeStatus: "BUILDING",
    },
    totalDesserts: 0,
    loading: true,
    options: {} 
  }),
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.editedItem.title.$dirty) return errors;
      !this.$v.editedItem.title.required &&
        errors.push("Question title required!");
      !this.$v.editedItem.title.maxLength &&
        errors.push("Question title length must less than 255!");
      return errors;
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loading = true;
      HostManageService.updateChallenge({
        id: this.editedItem.id,
        isNonDeleted: false,
      })
        .catch(console.log)
        .finally(() => {
          this.loading = false;
          this.getDataFromApi();
        });

      this.closeDelete();
      this.loading = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      this.loading = true;

      if (this.editedIndex > -1) {
        HostManageService.updateChallenge(Object.assign({}, this.editedItem))
          .catch(console.log)
          .finally(() => {
            this.loading = false;
            this.getDataFromApi();
          });
      } else {
        HostManageService.addChallenge(Object.assign({}, this.editedItem))
          .catch(console.log)
          .finally(() => {
            this.loading = false;
            this.getDataFromApi();
          });
      }
      this.close();
    },
    getDataFromApi() {
      //  console.log(this.options);
      this.loading = true;
      HostManageService.findAllChallenge(this.options)
        .then((response) => {
          // console.log(response.data);
          this.desserts = response.data.list;
          this.totalDesserts = response.data.totalElements;
        })
        .catch(console.log)
        .finally((this.loading = false));
    },

    uploadFile(file) {
      if (file === null || file === undefined) return;

      var formData = new FormData();
      formData.append("file", file);

      HostManageService.upload(formData)
        .then((response) => {
          //console.log(response.data);
          this.editedItem.coverImage = response.data
        })
        .catch(console.log)
        .finally((this.loading = false));
    },
    play(item) {
      // join a game

      HostOrganizeService.joinChallenge({
        challengeId: item.id,
      }).then(() => {
        this.$router.push({
          name: "host.wait",
          query: { challengeId: item.id },
        });
      });
    },
  },
};
</script>