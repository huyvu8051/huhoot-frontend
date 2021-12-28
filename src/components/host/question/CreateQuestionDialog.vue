<template>
  <ConfirmDialog
    v-model="value"
    @input="reset()"
    :action="action"
    :error="$v"
    btnText="NEW ITEM"
    fullscreen
    actionLeft
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
            <UploadFile v-model="editedItem.questionImage" />
          </v-col>
          <v-col cols="12">
            <p>Question image</p>
           <ImageWrapper
              :src="editedItem.questionImage"
              contain
              :windowRatio="30"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </ConfirmDialog>
</template>

<script>
import UploadFile from "@/components/UploadFile";
import HostManageService from "@/services/HostManageService";
import ImageWrapper from "@/components/ImageWrapper";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  minValue,
} from "vuelidate/lib/validators";

import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  components: {
    ConfirmDialog,
    ImageWrapper,
    UploadFile,
  },
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
        ordinalNumber: 0,
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
      imageHeight: "100%",
    };
  },
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