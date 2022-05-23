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
      <!-- :disabled="unselectable" -->
      <v-card
        class="flex d-flex flex-column"
        @click="selectAnswer(i)"
        :style="getColor(i.id, index)"
      >
        <v-card-text class="flex white--text">
          <b>{{ i.content }}</b>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    disable: Boolean,
  },
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
    answers: (state) => {
      console.log("Answers change");
      return state.answers;
    },
    unselectable(state) {
      return (
        state.studentSubmited ||
        state.question.timeout < new Date().getTime() ||
        this.disable
      );
    },
  }),
  created() {},
  methods: {
    getColor(id, index) {
      if (index < 0 || index > this.colors.length - 1) return {};

      var state = this.$store.state;

      var opacity =
        state.correctAnswerIds.includes(id) ||
        state.question.timeout > new Date().getTime()
          ? 1
          : 0.2;

      var s =
        state.question.timeout > new Date().getTime()
          ? state.selectedAnswerIds.includes(id)
          : state.submitedAnswerIds.includes(id);

      var scale;
      var rotate;

      if (s) {
        // map selected answer style

        scale = 0.8;
        rotate = "20deg";
      } else {
        scale = 1;
        rotate = "0deg";
      }

      var result = {
        "background-color": this.colors.at(index),
        opacity: opacity,
        transform: "scale(" + scale + ") rotateX(" + rotate + ")",
      };
      return result;
    },
    selectAnswer(item) {
      if (!this.unselectable) {
        this.$store.commit("selectAnswer", item);
      }
    },
  },
};
</script>

<style scoped>
</style>