webpackJsonp([16],{"09Mm":function(t,e){},ioKe:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={data:function(){return{timeleft:"Start challenge",timeleftCountDown:null}},created:function(){this.countdown()},destroyed:function(){clearInterval(this.timeleftCountDown)},methods:{startChallenge:function(){console.log("start challenge"),this.$router.push({name:"host.get",query:{challengeId:this.$route.query.challengeId}})},countdown:function(){var t=3,e=this;this.timeleftCountDown=setInterval(function(){t<=0&&(e.startChallenge(),clearInterval(e.timeleftCountDown)),e.timeleft=t,t--},1e3)}}},o={render:function(){var t=this.$createElement;return(this._self._c||t)("h1",[this._v(this._s(this.timeleft))])},staticRenderFns:[]};var i=n("VU/8")(l,o,!1,function(t){n("09Mm")},"data-v-77322197",null);e.default=i.exports}});
//# sourceMappingURL=16.f8e5e2b843ef8d98227f.js.map