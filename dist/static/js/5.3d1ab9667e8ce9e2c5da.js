webpackJsonp([5],{"6tVq":function(t,e){},VpXL:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("soqp"),u={props:{NumOfStudent:Number},data:function(){return{lockText:"Lock"}},created:function(){var t=this;this.$eventBus.$on("updateScore",function(e){t.score=e})},components:{},methods:{startChallenge:function(){s.a.startChallenge({challengeId:this.$route.query.challengeId})},lockChallenge:function(){console.log("lock room")}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app-bar",{staticClass:"cyan",attrs:{app:"",flat:"","hide-on-scroll":""}},[n("b",[t._v(t._s(t.NumOfStudent)+" Student")]),t._v(" "),n("v-spacer",[n("b",[t._v("Challenge id: "+t._s(t.$route.query.challengeId))])]),t._v(" "),n("v-btn",{staticClass:"black white--text mr-2",attrs:{to:{name:"HOST"}}},[t._v("\n    Return\n  ")]),t._v(" "),n("v-btn",{staticClass:"deep-purple white--text",on:{click:t.startChallenge}},[t._v("\n    Start\n  ")])],1)},staticRenderFns:[]};var i=n("VU/8")(u,o,!1,function(t){n("6tVq")},null,null).exports,r={props:{student:Object},data:function(){return{onHover:!1}},methods:{kickStudent:function(){console.log("kick student id: ",this.student.studentId,this.$route.query.challengeId),this.$eventBus.$emit("kickStudent",[this.student.studentId])}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-btn",{staticClass:"ma-1",class:{"text-decoration-line-through":t.onHover}},[n("b",{on:{mouseover:function(e){t.onHover=!0},mouseleave:function(e){t.onHover=!1},click:t.kickStudent}},[t._v("\n    "+t._s(t.student.studentId+" "+t.student.studentFullName)+"\n  ")])])},staticRenderFns:[]};var l={components:{WaitingRoomHeader:i,StudentInWaitingRoom:n("VU/8")(r,a,!1,function(t){n("ldpJ")},null,null).exports},props:{challenge:Object},data:function(){return{students:[],updateStudentsLoginInterval:{}}},created:function(){this.updateStudentsLogin(),this.registEventBus()},beforeDestroy:function(){clearInterval(this.updateStudentsLoginInterval),this.$eventBus.$off("kickStudent")},methods:{registEventBus:function(){var t=this;this.$eventBus.$on("kickStudent",function(e){s.a.kickStudent({studentIds:e,challengeId:t.$route.query.challengeId}),t.students=t.students.filter(function(t){return!e.includes(t.studentId)})})},updateStudentsLogin:function(){this.getStudentsLogin(),this.updateStudentsLoginInterval=setInterval(this.getStudentsLogin,5e3)},getStudentsLogin:function(){var t=this;s.a.getStudentsOnline({challengeId:this.$route.query.challengeId}).then(function(e){t.students=e.data})}}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-main",[e("WaitingRoomHeader",{attrs:{NumOfStudent:this.students.length,challenge:this.challenge}}),this._v(" "),e("v-container",{attrs:{fluid:"","rounded-lg":""}},[e("v-layout",{attrs:{"align-center":"","justify-center":""}},[e("v-row",[e("v-col",this._l(this.students,function(t,n){return e("StudentInWaitingRoom",{key:n,attrs:{student:t}})}),1)],1)],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(l,c,!1,function(t){n("rbwj")},null,null);e.default=d.exports},ldpJ:function(t,e){},rbwj:function(t,e){}});
//# sourceMappingURL=5.3d1ab9667e8ce9e2c5da.js.map