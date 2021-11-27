import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";

import Account from "@/components/Account";


import Student from "@/components/student/Student";
import ListChallenge from "@/components/student/ListChallenge";

import ChallengeLayout from "@/components/student/ChallengeLayout";

import Challenge from "@/components/student/Challenge";


import Admin from "@/components/admin/Admin";


import HostLayout from "@/components/host/HostLayout";
import OrganizeChallenge from "@/components/host/organize/OrganizeChallenge";
import HostListChallenge from "@/components/host/ListChallenge";
import publishQuestion from "@/components/host/organize/question/publishQuestion";

import WaitingRoom from "@/components/host/organize/WaitingRoom";
import PublishQuestionIntro from "@/components/host/organize/PublishQuestionIntro";
import PublishQuestionContent from "@/components/host/organize/question/PublishQuestionContent";
import publishAnswerStatistics from "@/components/host/organize/question/publishAnswerStatistics";
import StartChallenge from "@/components/host/organize/StartChallenge";
import TopStudent from "@/components/host/organize/question/TopStudent";
import Store from "@/store/store";



Vue.use(Router);

const router = new Router({
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
      component: HostLayout,
      children: [
        {
          path: "/host/challenge",
          name: "HOST",
          component: HostListChallenge,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: "/organize",
      component: OrganizeChallenge,
      children: [

        {
          path: "/organize/waiting",
          name: "waitingRoom",
          component: WaitingRoom
        },
        {
          path: "/organize/start",
          name: "host.startChallenge",
          component: StartChallenge
        },
        {
          path: "/organize/question",
          name: "host.publishQuestion",
          component: publishQuestion,
          children: [
            {
              path: "/organize/question/intro",
              name: "host.publishQuestionIntro",
              component: PublishQuestionIntro
            },
            {
              path: "/organize/question/content",
              name: "host.publishQuestionContent",
              component: PublishQuestionContent
            },
            {
              path: "/organize/question/statistics",
              name: "host.publishAnswerStatistics",
              component: publishAnswerStatistics
            },
            {
              path: "/organize/question/topStudent",
              name: "host.topStudent",
              component: TopStudent
            },
          ]
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



router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!Store.state.token) {
      next({
        name: "login"
      });
    } else {
      next()
    }

  }
  else {
    next()
  }
})

export default router;
