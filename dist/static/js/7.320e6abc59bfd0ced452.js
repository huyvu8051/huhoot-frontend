webpackJsonp([7],{"7uLg":function(t,e){},Ubiv:function(t,e){},VpXL:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("soqp"),u={props:{NumOfStudent:Number},data:function(){return{}},created:function(){var t=this;this.$eventBus.$on("updateScore",function(e){t.score=e})},components:{},methods:{startChallenge:function(){s.a.startChallenge({challengeId:this.$route.query.challengeId})},lockChallenge:function(){console.log("lock room")}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app-bar",{staticClass:"cyan",attrs:{app:"",flat:"","hide-on-scroll":""}},[n("b",[t._v(t._s(t.NumOfStudent)+" Student")]),t._v(" "),n("v-spacer",[n("b",[t._v("Challenge id: "+t._s(t.$route.query.challengeId))])]),t._v(" "),n("v-btn",{staticClass:"black white--text mr-2",attrs:{to:{name:"HOST"}}},[t._v("\n    Return\n  ")]),t._v(" "),n("v-btn",{staticClass:"red white--text mr-2",on:{click:t.lockChallenge}},[t._v(" Lock ")]),t._v(" "),n("v-btn",{staticClass:"deep-purple white--text",on:{click:t.startChallenge}},[t._v("\n    Start\n  ")])],1)},staticRenderFns:[]};var a=n("VU/8")(u,o,!1,function(t){n("7uLg")},null,null).exports,r={props:{student:Object},data:function(){return{onHover:!1}},methods:{kickStudent:function(){console.log("kick student id: ",this.student.studentId,this.$route.query.challengeId),s.a.kickStudent({studentIds:[this.student.studentId],challengeId:this.$route.query.challengeId})}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-btn",{staticClass:"ma-1",class:{"text-decoration-line-through":t.onHover}},[n("b",{on:{mouseover:function(e){t.onHover=!0},mouseleave:function(e){t.onHover=!1},click:t.kickStudent}},[t._v("\n    "+t._s(t.student.studentId+" "+t.student.studentFullName)+"\n  ")])])},staticRenderFns:[]};var l={components:{WaitingRoomHeader:a,StudentInWaitingRoom:n("VU/8")(r,i,!1,function(t){n("WrCS")},null,null).exports},data:function(){return{students:[],updateStudentsLoginInterval:{}}},created:function(){this.updateStudentsLogin()},destroyed:function(){clearInterval(this.updateStudentsLoginInterval)},methods:{updateStudentsLogin:function(){this.getStudentsLogin(),this.updateStudentsLoginInterval=setInterval(this.getStudentsLogin,5e3)},getStudentsLogin:function(){var t=this;s.a.getStudentsOnline({challengeId:this.$route.query.challengeId}).then(function(e){console.log(e),t.students=e.data})}}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-main",[e("WaitingRoomHeader",{attrs:{NumOfStudent:this.students.length}}),this._v(" "),e("v-container",{attrs:{fluid:"","rounded-lg":""}},[e("v-layout",{attrs:{"align-center":"","justify-center":""}},[e("v-row",[e("v-col",this._l(this.students,function(t,n){return e("StudentInWaitingRoom",{key:n,attrs:{student:t}})}),1)],1)],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(l,c,!1,function(t){n("Ubiv")},null,null);e.default=d.exports},WrCS:function(t,e){}});
//# sourceMappingURL=7.320e6abc59bfd0ced452.js.map