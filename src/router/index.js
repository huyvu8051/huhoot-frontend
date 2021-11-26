import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";

import Account from "@/components/Account";


import Student from "@/components/student/Student";
import ListChallenge from "@/components/student/ListChallenge";

import ChallengeLayout from "@/components/student/ChallengeLayout";

import Challenge from "@/components/student/Challenge";


import Admin from "@/components/admin/Admin";
import Host from "@/components/host/Host";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [

    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/student",
      component: Student,
      children: [
        {
          path: "/",
          name: "STUDENT",
          component: ListChallenge
        },

      ]
    },
    {
      path: "/challenge/:challengeId",
      component: ChallengeLayout,
      children: [
        {
          path: "/",
          name: "student.challenge",
          component: Challenge
        },
      ]
    },
    {
      path: "/admin",
      component: Admin,
      children: [
        {
          path: "/",
          name: "ADMIN",
          component: Account
        },
      ]
    },
    {
      path: "/host",
      component: Host,
      children: [
        {
          path: "/",
          name: "HOST",
          component: Account
        },
      ]
    },
    {
      path: "/account",
      name: "account",
      component: Account
    }
  ]
});
