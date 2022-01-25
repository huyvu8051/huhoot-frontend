<template>
  <h-confirm-dialog
    v-model="value"
    @input="reset()"
    :action="action"
    :error="$v"
    btnText="NEW ITEM"
    actionLeft
    fullscreen
  >
    <v-card-title>
      <span class="text-h5">NEW ITEM</span>
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
              outlined
              @input="$v.editedItem.questionContent.$touch()"
              @blur="$v.editedItem.questionContent.$touch()"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              v-model="editedItem.answerTimeLimit"
              type="number"
              min="5"
              label="Answer time limit"
              :error-messages="answerTimeLimitErrors"
              required
              outlined
              @input="$v.editedItem.answerTimeLimit.$touch()"
              @blur="$v.editedItem.answerTimeLimit.$touch()"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="3" md="3">
            <v-select
              :items="answerOption"
              v-model="editedItem.answerOption"
              label="Answer option"
              outlined
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-select
              :items="point"
              v-model="editedItem.point"
              label="Point"
              outlined
            >
            </v-select>
          </v-col>

          <v-col cols="12" sm="3" md="3">
            <h-upload-file v-model="editedItem.questionImage" />
          </v-col>
          <v-col cols="12">
            <p>Question image</p>
            <h-fit-height-image :src="editedItem.questionImage" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </h-confirm-dialog>
</template>

<script>
import HostManageService from "@/services/HostManageService";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    editedItem: {
      answerTimeLimit: { required, minValue: minValue(5) },
      questionContent: {
        required,
        maxLength: maxLength(255),
      },
    },
  },
  data() {
    return {
      value: false,
      answerOption: ["SINGLE_SELECT", "MULTI_SELECT"],
      point: ["STANDARD", "DOUBLE_POINTS", "NO_POINTS"],

      editedItem: {},
      defaultItem: {
        id: 0,
        questionContent: "",
        questionImage: "hutech-logo.png",
        answerOption: "SINGLE_SELECT",
        answerTimeLimit: 10,
        point: "STANDARD",
      },
      action: {
        confirm: () =>
          HostManageService.addQuestion(
            Object.assign(
              {
                challengeId: this.$route.query.challengeId,
              },
              this.editedItem
            )
          ),
      },
    };
  },
  computed: {
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
  },

  methods: {
    reset() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },
  },
};
</script>

<style>
</style>