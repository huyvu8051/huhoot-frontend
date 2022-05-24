<template>
  <v-row class="ma-0 red">
    <v-col
      cols="6"
      xs="6"
      sm="6"
      class="d-flex answer-col"
      v-for="(i, index) in answers"
      :key="i.id"
    >
      <!-- :disabled="unselectable" -->

      <div
        class="flex d-flex rounded-lg"
        @click="selectAnswer(i)"
        :style="getColor(i.id, index)"
      >
        <div class="flex white--text answer-content">
          <b>{{ i.content }}</b>
        </div>
        <v-icon color="white" class="icon"> close </v-icon>
      </div>
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
        "rgb(226, 27, 60)",
        "rgb(19, 104, 206)",
        "rgb(216, 158, 0)",
        "rgb(38, 137, 12)",
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
        // opacity: 1,
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
.answer-col{
  padding: 0.5vmin;
}

.answer-content {
  line-height: normal;
  font-size: 2.6vmin;

  padding: 1vmin;

  text-align: left;
  display: flex;
  justify-content: left;
  align-items: center;
}

.icon {
  font-size: 5vmin;
  margin: 1vmin;
}
</style>