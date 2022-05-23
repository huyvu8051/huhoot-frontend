<template>
  <v-main>
    <v-btn
      dark
      color="cyan"
      fixed
      left
      bottom
      style="z-index: 1"
      @click="enableAutoOrganize()"
    >
      enable
    </v-btn>
    <v-btn
      dark
      color="cyan"
      fixed
      right
      bottom
      style="z-index: 1"
      @click="disableAutoOrganize()"
    >
      disable
    </v-btn>
    <h-flex-layout>
      <router-view :socket="socket" />
    </h-flex-layout>
  </v-main>
</template>

<script>
import io from "socket.io-client";
import TimeCountDown from "@/components/TimeCountDown";
import AutoOrganizeService from "@/services/AutoOrganizeService";
export default {
  components: {
    TimeCountDown,
  },
  data() {
    return {
      socket: {},
      connected: false,
    };
  },

  created() {
    this.socket = this.connectSocket();
    this.registerEvent(this.socket);
  },
  beforeDestroy() {
    this.removeSocketListener(this.socket);
    this.socket.disconnect();
  },
  methods: {
    enableAutoOrganize() {
      AutoOrganizeService.enableAutoOrganize(this.$route.query.challengeId);
    },
    disableAutoOrganize() {
      AutoOrganizeService.disableAutoOrganize(this.$route.query.challengeId);
    },
    connectSocket() {
      var socket = io.connect(this.$socketUrl);
      socket
        .on("connected", (data) => {
          console.log(data);
        })
        .emit("registerHostSocket", {
          challengeId: this.$route.query.challengeId,
          token: this.$store.state.token,
        });

      socket.on("registerSuccess", (data) => {
        
        this.$store.commit("disableAutoOrganize");
        this.$store.commit("saveChallengeData", data.currentExam);
        this.challenge = data;
        this.connected = true;
      });

      socket.on("joinError", (data) => {
        this.$eventBus.$emit("nofication", {
          message: "Cann't connect to room!!!",
          status: "error",
        });
        this.$router
          .push({
            name: "HOST",
          })
          .catch((err) => err);
      });

      return socket;
    },
    registerEvent(socket) {
      socket.on("startChallenge", () => {
        this.$router
          .push({
            name: "host.start",
            query: {
              challengeId: this.$route.query.challengeId,
            },
          })
          .catch((err) => err);
      });
      socket.on("publishQuestion", (data) => {
        this.$store.commit("publishExam", data);
        this.$router
          .push({
            name: "host.ready",
            query: {
              challengeId: this.$route.query.challengeId,
              questionId: this.$store.state.question.id,
            },
          })
          .catch((err) => err);
      });

      socket.on("showCorrectAnswer", (data) => {
        this.$store.commit("showCorrectAnswer", data);
      });

      socket.on("endChallenge", () => {
        this.$router
          .push({
            name: "host.finish",
            query: {
              challengeId: this.$route.query.challengeId,
            },
          })
          .catch((err) => err);
      });
      // socket.on("enableAutoOrganize", (data) => {
      //   this.$success("enableAutoOrganize");
      //   this.$store.commit("enableAutoOrganize", data);
      // });
      socket.on("disableAutoOrganize", (data) => {
        this.$success("disableAutoOrganize");
        this.$store.commit("disableAutoOrganize", data);
      });
    },
    removeSocketListener(socket) {
      socket.off("connected");
      socket.off("registerSuccess");
      socket.off("joinError");
      socket.off("startChallenge");
      socket.off("publishQuestion");
      socket.off("showCorrectAnswer");
      socket.off("endChallenge");
      socket.off("enableAutoOrganize");
      socket.off("disableAutoOrganize");
    },
  },
};
</script>

<style>
</style>