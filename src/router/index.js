import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";

import Account from "@/components/Account";


import Student from "@/components/student/Student";
import ListChallenge from "@/components/student/ListChallenge";
import ChallengeLayout from "@/components/student/ChallengeLayout";
import Challenge from "@/components/student/Challenge";

import Participate from "@/components/student/participate/Participate";
import StudentWaiting from "@/components/student/participate/Waiting";
import StudentStartChallenge from "@/components/student/participate/StartChallenge";
import StudentPublishQuestionIntro from "@/components/student/participate/PublishQuestionIntro";
import StudentPublishQuestionContent from "@/components/student/participate/PublishQuestionContent";
import StudentPublishAnswerStatistics from "@/components/student/participate/PublishAnswerStatistics";
import StudentChallengeFinish from "@/components/student/participate/ChallengeFinish";
import StudentPublishQuestionReady from "@/components/student/participate/PublishQuestionReady";



import Admin from "@/components/admin/Admin";


import HostLayout from "@/components/host/HostLayout";
import OrganizeChallenge from "@/components/host/organize/OrganizeChallenge";
import HostListChallenge from "@/components/host/challenge/ListChallenge";
import HostListQuestion from "@/components/host/challenge/ListQuestion";
import HostListAnswer from "@/components/host/challenge/ListAnswer";
import ListStudentInChallenge from "@/components/host/challenge/ListStudentInChallenge";
import ListStudent from "@/components/host/challenge/ListStudent";

import WaitingRoom from "@/components/host/organize/WaitingRoom";
import PublishQuestionIntro from "@/components/host/organize/PublishQuestionIntro";
import PublishQuestionContent from "@/components/host/organize/PublishQuestionContent";
import publishAnswerStatistics from "@/components/host/organize/PublishAnswerStatistics";
import StartChallenge from "@/components/host/organize/StartChallenge";
import TopStudent from "@/components/host/organize/TopStudent";
import ChallengeFinish from "@/components/host/organize/ChallengeFinish";
import PublishQuestionReady from "@/components/host/organize/PublishQuestionReady";



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

    // student
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
      path: "/participate/",
      component: Participate,
      children: [
        {
          path: "waiting",
          name: "student.waiting",
          component: StudentWaiting
        },
        {
          path: "start",
          name: "student.startChallenge",
          component: StudentStartChallenge
        },
        {
          path: "intro",
          name: "student.publishQuestionIntro",
          component: StudentPublishQuestionIntro
        },
        {
          path: "ready",
          name: "student.publishQuestionReady",
          component: StudentPublishQuestionReady
        },
        {
          path: "content",
          name: "student.publishQuestionContent",
          component: StudentPublishQuestionContent
        },
        {
          path: "statistics",
          name: "student.publishAnswerStatistics",
          component: StudentPublishAnswerStatistics
        },
        {
          path: "end",
          name: "student.challengeFinish",
          component: StudentChallengeFinish
        },
      ]
    },

    // admin
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

    // host

    {
      path: "/host/",
      component: HostLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "challenge",
          name: "HOST",
          component: HostListChallenge,

        },
        {
          path: "question",
          name: "host.listQuestion",
          component: HostListQuestion
        },
        {
          path: "answer",
          name: "host.listAnswer",
          component: HostListAnswer
        },
        {
          path: "studentInChallenge",
          name: "host.listStudentInChallenge",
          component: ListStudentInChallenge
        },
        {
          path: "student",
          name: "host.student",
          component: ListStudent
        },
      ]
    },
    {
      path: "/organize/",
      component: OrganizeChallenge,
      meta: {
        requiresAuth: true
      },
      children: [

        {
          path: "waiting",
          name: "waitingRoom",
          component: WaitingRoom
        },
        {
          path: "start",
          name: "host.startChallenge",
          component: StartChallenge
        },
        {
          path: "intro",
          name: "host.publishQuestionIntro",
          component: PublishQuestionIntro
        },
        {
          path: "ready",
          name: "host.publishQuestionReady",
          component: PublishQuestionReady
        },
        {
          path: "content",
          name: "host.publishQuestionContent",
          component: PublishQuestionContent
        },
        {
          path: "statistics",
          name: "host.publishAnswerStatistics",
          component: publishAnswerStatistics
        },
        {
          path: "topStudent",
          name: "host.topStudent",
          component: TopStudent
        },
        {
          path: "end",
          name: "host.challengeFinish",
          component: ChallengeFinish
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
