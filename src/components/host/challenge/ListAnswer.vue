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
          <v-toolbar-title>List Answer</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
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
                      <v-switch v-model="editedItem.isCorrect" label="Correct">
                      </v-switch>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.answerContent"
                        label="Content"
                        :error-messages="answerContentErrors"
                        :counter="255"
                        required
                        @input="$v.editedItem.answerContent.$touch()"
                        @blur="$v.editedItem.answerContent.$touch()"
                      >
                      </v-textarea>
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getDataFromApi()"> Reset </v-btn>
      </template>
      <template v-slot:[`item.createdDate`]="{ item }">
        <DateFormater :date="item.createdDate" />
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import HostManageService from "@/services/HostManageService";

import DateFormater from "@/components/DateFormater";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  // validate
  mixins: [validationMixin],
  validations: {
    editedItem: {
      ordinalNumber: { required, minValue: minValue(0) },
      answerContent: {
        required,
        maxLength: maxLength(255),
      },
    },
  },
  components: {
    DateFormater,
  },
  // data
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id", align: "start", sortable: true },
      { text: "No", value: "ordinalNumber" },
      { text: "Content", value: "answerContent" },
      { text: "Created date", value: "createdDate" },
      { text: "Correct", value: "isCorrect" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      answerContent: "",
      ordinalNumber: 0,
      isCorrect: false,
    },
    defaultItem: {
      answerContent: "",
      ordinalNumber: 0,
      isCorrect: false,
    },
    totalDesserts: 0,
    loading: true,
    options: {},
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
    answerContentErrors() {
      const errors = [];
      if (!this.$v.editedItem.answerContent.$dirty) return errors;
      !this.$v.editedItem.answerContent.required &&
        errors.push("Answer content required!");
      !this.$v.editedItem.answerContent.maxLength &&
        errors.push("Answer content length must less than 255!");
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
      HostManageService.updateAnswer({
        id: this.editedItem.id,
        isNonDeleted: false,
      }).finally(() => {
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

      console.log("edit", this.editedItem);

      if (this.editedIndex > -1) {
        HostManageService.updateAnswer(
          Object.assign(
            { questionId: this.$route.query.questionId },
            this.editedItem
          )
        ).finally(() => {
          this.loading = false;
          this.getDataFromApi();
        });
      } else {
        HostManageService.addAnswer(
          Object.assign(
            { questionId: this.$route.query.questionId },
            this.editedItem
          )
        ).finally(() => {
          this.loading = false;
          this.getDataFromApi();
        });
      }

      this.close();
    },
    getDataFromApi() {
      // console.log(this.options);
      this.options.questionId = this.$route.query.questionId;
      this.loading = true;
      HostManageService.findAllAnswer(this.options)
        .then((response) => {
          // console.log(response.data);
          this.desserts = response.data.list;
          this.totalDesserts = response.data.totalElements;
        })
        .finally((this.loading = false));
    },
  },
};
</script>