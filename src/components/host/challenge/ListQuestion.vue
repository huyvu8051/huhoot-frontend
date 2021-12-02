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
          <v-toolbar-title>List Question</v-toolbar-title>
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
                        v-model="editedItem.questionContent"
                        label="Content"
                        :error-messages="questionContentErrors"
                        :counter="255"
                        required
                        @input="$v.editedItem.questionContent.$touch()"
                        @blur="$v.editedItem.questionContent.$touch()"
                      >
                      </v-textarea>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.ordinalNumber"
                        type="number"
                        min="0"
                        label="Ordinal Number"
                        :error-messages="ordinalNumberErrors"
                        required
                        @input="$v.editedItem.ordinalNumber.$touch()"
                        @blur="$v.editedItem.ordinalNumber.$touch()"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.answerTimeLimit"
                        type="number"
                        min="5"
                        label="Answer time limit"
                        :error-messages="answerTimeLimitErrors"
                        required
                        @input="$v.editedItem.answerTimeLimit.$touch()"
                        @blur="$v.editedItem.answerTimeLimit.$touch()"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="answerOption"
                        v-model="editedItem.answerOption"
                        label="Answer option"
                        outlined
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="point"
                        v-model="editedItem.point"
                        label="Point"
                        outlined
                      >
                      </v-select>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-file-input
                        name="image"
                        accept="image/*"
                        label="Upload Image"
                        @change="uploadFile"
                        show-size
                      >
                      </v-file-input>
                    </v-col>
                    <v-col cols="12">
                      <p>Question image</p>
                      <ImageWrapper :src="editedItem.questionImage" />
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
        <v-icon small class="mr-2" @click="viewListAnswer(item)">
          view_list
        </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <!--<Review :question="item" /> -->
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getDataFromApi()"> Reset </v-btn>
      </template>
      <template v-slot:[`item.questionImage`]="{ item }">
        <ImageDataTable :src="item.questionImage" />
      </template>
      <template v-slot:[`item.createdDate`]="{ item }">
        <DateFormater :date="item.createdDate" />
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import HostManageService from "@/services/HostManageService";

import ImageDataTable from "@/components/ImageDataTable";
import DateFormater from "@/components/DateFormater";
import Review from "@/components/host/challenge/Review";

import ImageWrapper from "@/components/ImageWrapper";

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
    Review,
    ImageWrapper,
  },
  // validate
  mixins: [validationMixin],
  validations: {
    editedItem: {
      ordinalNumber: { required, minValue: minValue(0) },
      answerTimeLimit: { required, minValue: minValue(5) },
      questionContent: {
        required,
        maxLength: maxLength(255),
      },
    },
  },

  // data
  data: () => ({
    answerOption: ["SINGLE_SELECT", "MULTI_SELECT"],
    point: ["STANDARD", "DOUBLE_POINTS", "NO_POINTS"],
    radioGroup: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id", align: "start", sortable: true },
      { text: "No", value: "ordinalNumber" },
      { text: "Content", value: "questionContent" },
      { text: "Img", value: "questionImage" },
      { text: "Created date", value: "createdDate" },
      { text: "Answer option", value: "answerOption" },
      { text: "Answer time", value: "answerTimeLimit" },
      { text: "Point", value: "point" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      questionContent: "",
      questionImage: "hutech-logo.png",
      ordinalNumber: 0,
      answerOption: "SINGLE_SELECT",
      answerTimeLimit: 10,
      point: "STANDARD",
    },
    defaultItem: {
      id: 0,
      questionContent: "",
      questionImage: "hutech-logo.png",
      ordinalNumber: 0,
      answerOption: "SINGLE_SELECT",
      answerTimeLimit: 10,
      point: "STANDARD",
    },
    totalDesserts: 0,
    loading: true,
    options: {},
    updateOptions: {},
  }),
  computed: {
    ordinalNumberErrors() {
      const errors = [];
      if (!this.$v.editedItem.ordinalNumber.$dirty) return errors;
      !this.$v.editedItem.ordinalNumber.required &&
        errors.push("Ordinal number required!");
      !this.$v.editedItem.ordinalNumber.minValue &&
        errors.push("Ordinal number must greater than 0!");
      return errors;
    },
    answerTimeLimitErrors() {
      const errors = [];
      if (!this.$v.editedItem.answerTimeLimit.$dirty) return errors;
      !this.$v.editedItem.answerTimeLimit.required &&
        errors.push("Answer time limit required!");
      !this.$v.editedItem.answerTimeLimit.minValue &&
        errors.push("Answer time limit must greater than 5!");
      return errors;
    },
    questionContentErrors() {
      const errors = [];
      if (!this.$v.editedItem.questionContent.$dirty) return errors;
      !this.$v.editedItem.questionContent.required &&
        errors.push("Question content required!");
      !this.$v.editedItem.questionContent.maxLength &&
        errors.push("Question content length must less than 255!");
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
      HostManageService.updateQuestion({
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
        HostManageService.updateQuestion(
          Object.assign(
            {
              challengeId: this.$route.query.challengeId,
            },
            this.editedItem
          )
        )
          .catch(console.log)
          .finally(() => {
            this.loading = false;
            this.getDataFromApi();
          });
      } else {
        HostManageService.addQuestion(
          Object.assign(
            {
              challengeId: this.$route.query.challengeId,
            },
            this.editedItem
          )
        )
          .catch(console.log)
          .finally(() => {
            this.loading = false;
            this.getDataFromApi();
          });
      }

      this.close();
    },
    getDataFromApi() {
      this.loading = true;

      //console.log("Update table", this.options);
      this.options.challengeId = this.$route.query.challengeId;

      HostManageService.findAllQuestion(this.options)
        .then((response) => {
          //  console.log(response.data.list);
          this.desserts = response.data.list;
          this.totalDesserts = response.data.totalElements;
          this.loading = false;
        })
        .catch(console.log)
        .finally((this.loading = false));
    },
    viewListAnswer(item) {
      this.$router.push({
        name: "host.listAnswer",
        query: { questionId: item.id },
      });
    },
    preview(item) {
      console.log("preview", item);
    },
    uploadFile(file) {
      var formData = new FormData();
      formData.append("file", file);

      HostManageService.upload(formData)
        .then((response) => (this.editedItem.questionImage = response.data))
        .catch(console.log)
        .finally((this.loading = false));
    },
  },
};
</script>