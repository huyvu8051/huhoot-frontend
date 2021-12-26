<template>
  <ConfirmDialog
    :value="value"
    @input="(e) => $emit('input', e)"
    :action="action"
    :error="$v"
    fullscreen
    actionLeft
  >
    <template v-slot:activator>
      <div />
      <!-- null slot, disable default activator btn-->
    </template>
    <v-card-title>
      <span class="text-h5">Edit Item</span>
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
            <ImageWrapper
              :src="editedItem.coverImage"
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
import HostManageService from "@/services/HostManageService";
import ImageWrapper from "@/components/ImageWrapper";

import UploadFile from "@/components/UploadFile";
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
  props: {
    item: Object,
    value: Boolean,
  },
  mixins: [validationMixin],
  validations: {
    editedItem: {
      title: { required, maxLength: maxLength(255) },
    },
  },
  data() {
    return {
      challengeStatus: [
        "BUILDING",
        "WAITING",
        "IN_PROGRESS",
        "LOCKED",
        "ENDED",
      ],
      answerOption: ["SINGLE_SELECT", "MULTI_SELECT"],
      point: ["STANDARD", "DOUBLE_POINTS", "NO_POINTS"],
      action: {
        confirm: () => HostManageService.updateChallenge(this.editedItem),
      },
      imageHeight: "100%",
    };
  },
  computed: {
    editedItem() {
      return this.item;
    },

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
    // =========================
  },
};
</script>

<style>
</style>