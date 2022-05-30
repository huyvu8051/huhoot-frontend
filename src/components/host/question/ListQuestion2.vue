<template>
  <v-row class="ma-0 pa-0">
    <v-col
      cols="12"
      xs="12"
      sm="3"
      md="2"
      lg="1"
      class="d-flex question_nav pa-0"
    >
      <div class="question_nav_res d-flex">
        <v-card
          v-for="(i, index) in data"
          :key="i.id"
          class="question_container"
          @click="chooseQuestion(index)"
        >
          <h-image-data-table
            class="justify-center align-center question_image"
            :src="i.questionImage"
            style="margin: 0 auto"
          />
          <v-card-subtitle
            class="question_text"
            style="
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 1rem;
              margin: 0;
            "
          >
            {{ i.questionContent }}
          </v-card-subtitle>
        </v-card>
      </div>
      <div style="margin: 3vmin auto">
        <v-btn color="green white--text ma-1">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn color="blue white--text ma-1">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" xs="12" sm="9" md="10" lg="11" style="height: 90vh">
      <v-card flat style="height: 40vh">
        <!-- input -->
        <div class="quest-content" style="height: 6vh; padding: 0.5vh 0">
          <v-text-field
            :value="editedItem ? editedItem.questionContent : ''"
            placeholder="Nội dung câu hỏi"
          ></v-text-field>
        </div>
        <!-- pic -->
        <div>
          <h-upload-file v-model="editedItem.questionImage" />
          <h-fit-height-image
            style="height: 16vh; margin-bottom: 0.5rem; margin-top: -1rem"
            :src="editedItem.questionImage"
          />
        </div>
        <!-- setting -->
        <v-row>
          <v-col cols="4" sm="4" md="4">
            <!-- v-model="editedItem.answerTimeLimit"
              :error-messages="answerTimeLimitErrors"
              @input="$v.editedItem.answerTimeLimit.$touch()"
              @blur="$v.editedItem.answerTimeLimit.$touch()" -->
            <v-text-field
              v-model="editedItem.answerTimeLimit"
              type="number"
              min="5"
              label="Thời gian"
              :error-messages="answerTimeLimitErrors"
              required
              outlined
              @input="$v.editedItem.answerTimeLimit.$touch()"
              @blur="$v.editedItem.answerTimeLimit.$touch()"
              height="1vh"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <!-- :items="answerOption"
              v-model="editedItem.answerOption" -->
            <v-select
              :items="answerOption"
              v-model="editedItem.answerOption"
              label="Loại trả lời"
              outlined
            >
            </v-select>
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <!-- :items="point"
              v-model="editedItem.point" -->
            <v-select
              :items="point"
              v-model="editedItem.point"
              label="Loại câu hỏi"
              outlined
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card>
      <!-- answer -->
      <v-row class="ma-0 pa-0" style="height: 50vh">
        <v-col
          cols="6"
          xs="6"
          sm="6"
          class="ma-0 pa-0 d-flex answer-col"
          v-for="(i, index) in colors"
          :key="index"
          style="height: calc(50vh / 3)"
        >
          <div
            class="flex d-flex answer-card"
            :style="getColor(i.id, index)"
            style="height: -webkit-fill-available; width: 100%"
          >
            <v-icon class="icon">{{
              answers[index]
                ? answers[index].isCorrect
                  ? "mdi-checkbox-marked-circle"
                  : "mdi-close-circle"
                : ""
            }}</v-icon>
            <div class="flex white--text answer-content">
              <b>{{ answers[index] ? answers[index].answerContent : "" }}</b>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import HostManageService from "@/services/HostManageService";
import ManageAnswerService from "@/components/host/answer/ManageAnswerService";
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
    // validate question
    editedItem: {
      answerTimeLimit: { required, minValue: minValue(5) },
      questionContent: {
        required,
        maxLength: maxLength(255),
      },
    },
    // validate answer
    editedAnswer: {
      ordinalNumber: { required, minValue: minValue(0) },
      answerContent: {
        required,
        maxLength: maxLength(255),
      },
    },
  },
  data: () => ({
    // answer colors
    colors: [
      "rgb(226, 27, 60)",
      "rgb(19, 104, 206)",
      "rgb(216, 158, 0)",
      "rgb(38, 137, 12)",
      "#FE670A",
      "#74007E",
    ],
    // question options
    options: {
      challengeId: "3",
      groupBy: [],
      groupDesc: [],
      itemsPerPage: 100,
      multiSort: false,
      mustSort: false,
      page: 1,
      sortBy: [],
      sortDesc: [],
    },
    editedItem: {},
    answerOption: ["SINGLE_SELECT", "MULTI_SELECT"],
    point: ["STANDARD", "DOUBLE_POINTS", "NO_POINTS"],
    // question data
    data: [],
    // answer data
    answers: [],
    // answer options
    answerOptions: {
      groupBy: [],
      groupDesc: [],
      itemsPerPage: 100,
      multiSort: false,
      mustSort: false,
      page: 1,
      sortBy: [],
      sortDesc: [],
    },
    // default question
    // defaultItem: {
    //   id: 0,
    //   questionContent: "",
    //   questionImage: "hutech-logo.png",
    //   answerOption: "SINGLE_SELECT",
    //   answerTimeLimit: 10,
    //   point: "STANDARD",
    // },
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
  }),
  created() {
    //   this.options.challengeId = this.$route.query.challengeId;
    HostManageService.findAllQuestion(this.options)
      .then((response) => {
        this.data = response.data.list;
        this.editedItem = this.data[0];
        this.answerOptions.questionId = this.editedItem.id;
        // this.getAnswers();
        HostManageService.findAllAnswer(this.answerOptions).then((response) => {
          this.answers = response.data.list;
          console.log(this.answers)
        });
      })
      .catch(console.log);
  },
  methods: {
    chooseQuestion(index) {
      this.editedItem = this.data[index];

      this.answerOptions.questionId = this.editedItem.id;
      HostManageService.findAllAnswer(this.answerOptions).then((response) => {
        this.answers = response.data.list;
      });
    },

    getColor(id, index) {
      if (index < 0 || index > this.colors.length - 1) return {};

      var state = this.$store.state;

      var opacity = 1;

      var s =
        state.question.timeout > new Date().getTime()
          ? state.selectedAnswerIds.includes(id)
          : false;

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
  },
  computed: {
    // editedItem() {
    //   return this.item;
    // },
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
};
</script>

<style scoped>
@media screen and (max-width: 599px) {
  .question_nav_res {
    overflow-x: scroll !important;
    flex-direction: row !important;
    overflow-y: hidden !important;
    height: auto;
    margin-right: 1vmin;
  }
  .question_text {
    width: 20vw;
  }
  .question_nav {
    flex-direction: row !important;
  }
}

@media screen and (min-width: 600px) {
  .question_nav_res {
    height: 75vh;
  }
}

@media screen and (max-width: 768px) {
  .question_container {
    width: 150px;
  }
}
.question_nav_res {
  overflow-y: scroll;
  flex-direction: column;
  overflow-x: hidden;
  gap: 1vmin;
}

.question_nav {
  flex-direction: column;
}

.question_container {
  background-color: #e6e5e5;
  padding: 1vmin;
  width: 150px;
  margin: 1vmin auto;
}

.question_text {
  padding: 0px;
  padding-top: 0.5vmin;
}

.quest-content {
  height: 10vh;
  line-height: normal;
  font-size: calc(0.4rem + 1.76267vmin);
  /* background-color: rgba(158, 158, 158, 0.445);  */

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.answer-col {
  padding: 0.5vmin;
}

.answer-card {
  padding: 0px;
  margin: 0px;
  position: relative;
}

.icon {
  position: absolute;
  right: 2px;
  bottom: 2px;
  color: white;
}

.answer-content {
  line-height: normal;
  font-size: calc(0.4rem + 1.66267vmin);

  padding: 1vmin;
  margin: 0;

  text-align: justify;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
