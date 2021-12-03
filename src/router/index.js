import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";



import ListChallenge from "@/components/student/ListChallenge";


import Participate from "@/components/participate/Participate";



import HostLayout from "@/components/host/HostLayout";
import HostListChallenge from "@/components/host/challenge/ListChallenge";
import HostListQuestion from "@/components/host/challenge/ListQuestion";
import HostListAnswer from "@/components/host/challenge/ListAnswer";
import ListStudentInChallenge from "@/components/host/challenge/ListStudentInChallenge";
import ListStudent from "@/components/host/challenge/ListStudent";






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
          path: "rank",
          name: "host.rank",
          component: () => import("@/components/challengeRank/ChallengeRank"),

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
        {
          path: "account",
          name: "host.account",
          component: () => import("@/components/host/Account")

        }
      ]
    },
    {
      path: "/organize/",
      component: () => import("@/components/organize/Organize"),
      meta: {
        requiresAuth: true
      },
      children: [

        {
          path: "wait",
          name: "host.wait", 
          component: () => import("@/components/organize/wait/Wait")
        },
        {
          path: "start",
          name: "host.start",
          component: () => import("@/components/organize/start/Start")
        },
        {
          path: "get",
          name: "host.get",
          component: () => import("@/components/organize/get/GetQuestion")
        },
        {
          path: "ready",
          name: "host.ready",
          component: () => import("@/components/organize/ready/Ready")
        },
        {
          path: "ask",
          name: "host.ask",
          component: () => import("@/components/organize/ask/Ask")
        },
        {
          path: "show",
          name: "host.show",
          component: () => import("@/components/organize/show/Show")
        },
        {
          path: "rank",
          name: "host.organize.rank",
          component: () => import("@/components/organize/ChallengeRank")
        },
        {
          path: "finish",
          name: "host.finish",
          component: () => import("@/components/organize/finish/Finish")
        },

      ]
    },

    // student
    {
      path: "/student",
      component: () => import("@/components/student/Layout"),
      redirect: '/student/challenge',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "challenge",
          name: "STUDENT",
          component: ListChallenge
        },
        {
          path: "account",
          name: "student.account",
          component: () => import("@/components/student/Account")

        },

      ]
    },
  

    {
      path: "/participate",
      component: Participate,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "wait",
          name: "student.wait",
          component: () => import("@/components/participate/wait/Wait")
        },
        {
          path: "start",
          name: "student.start",
          component: () => import("@/components/participate/start/Start")
        },
        {
          path: "ready",
          name: "student.ready",
          component: () => import("@/components/participate/ready/Ready")
        },
        {
          path: "ask",
          name: "student.ask",
          component: () => import("@/components/participate/ask/Ask")
        },
        {
          path: "show",
          name: "student.show",
          component: () => import("@/components/participate/show/Show")
        },
        {
          path: "finish",
          name: "student.finish",
          component: () => import("@/components/participate/finish/Finish")
        },

      ]
    },

    // admin
    {
      path: "/admin",
      component: () => import("@/components/admin/Layout"),
      redirect: '/student',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "student",
          name: "ADMIN",
          component: () => import("@/components/admin/ListStudent"),
        },
        {
          path: "host",
          name: "admin.host",
          component: () => import("@/components/admin/ListHost"),
        },
        {
          path: "account",
          name: "admin.account",
          component: () => import("@/components/admin/Account"),
        },
      ]
    },



  ]
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
