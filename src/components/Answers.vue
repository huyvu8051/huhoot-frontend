<template>
  <v-row>
    <v-col
      cols="6"
      xs="6"
      sm="6"
      class="d-flex flex-column"
      v-for="(i, index) in answers"
      :key="i.id"
    >
      <v-card
        class="flex d-flex flex-column"
        :disabled="notSubmitable"
        @click="selectAnswer(i)"
        :style="getColor(index, i.isCorrect, i.selected)"
      >
        <v-card-text class="flex white--text">
          <b>{{ i.content }}</b>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AnswerColorSchemes from "@/services/AnswerColorSchemes";
import { mapState } from "vuex";

export default {
  data() {
    return {
      colors: [
        "#FF0000",
        "#0179B4",
        "#FFAA0D",
        "#12952E",
        "#FE670A",
        "#74007E",
      ],
    };
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    answers: (state) => state.answers,
    notSubmitable: (state) => {
      console.log(state.notSubmitable)
      
      return state.notSubmitable;
    },
 
  }),
  created() {},
  methods: {
    getColor(index, isCorrect, isSelected) {

      if (index < 0 || index > this.colors.length - 1) return {};

      var opacity;
      if (isCorrect === null || isCorrect === undefined || isCorrect === true) {
        opacity = 1;
      } else {
        opacity = 0.2;
      }
      var scale;
      var rotate;
      if (!isSelected || isSelected == null || isSelected == undefined) {
        scale = 1;
        rotate = "0deg";
      } else {
        scale = 0.8;
        rotate = "20deg";
      }

      //  console.log(isSelected,scale);

      var result = {
        "background-color": this.colors.at(index),
        opacity: opacity,
        transform: "scale(" + scale + ") rotateX(" + rotate + ")",
      };
      return result;
    },
    selectAnswer(item) {
      this.$store.commit("selectAnswer", item);
    },
  },
};
</script>

<style>
</style>