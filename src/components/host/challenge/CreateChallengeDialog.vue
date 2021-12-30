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
      <span class="text-h5">New Item</span>
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
              id="txtTitle"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch v-model="editedItem.randomAnswer" label="Random Answer">
            </v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-switch v-model="editedItem.randomQuest" label="Random Question">
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
             <UploadFile v-model="editedItem.coverImage" />
     
          </v-col>
          <v-col>
            <p>Challenge cover</p>
             <FitHeightImage
              :src="editedItem.coverImage"
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

import FitHeightImage from "@/components/FitHeightImage";
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
    FitHeightImage
  },
  mixins: [validationMixin],
  validations: {
    editedItem: {
      title: { required, maxLength: maxLength(255) },
    },
  },
  data() {
    return {
      value: false,
      challengeStatus: [
        "BUILDING",
        "WAITING",
        "IN_PROGRESS",
        "LOCKED",
        "ENDED",
      ],
      answerOption: ["SINGLE_SELECT", "MULTI_SELECT"],
      point: ["STANDARD", "DOUBLE_POINTS", "NO_POINTS"],
      radioGroup: 1,

      editedItem: {},
      defaultItem: {
        id: 0,
        title: "",
        coverImage: "huhoot-logo.png",
        randomAnswer: false,
        randomQuest: false,
        challengeStatus: "BUILDING",
      },
      action: {
        confirm: () => HostManageService.addChallenge(this.editedItem),
      },
      imageHeight: "100%",
    };
  },
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