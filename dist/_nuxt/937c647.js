(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{475:function(e,n,t){"use strict";t.r(n);var o=t(454),r=(t(32),t(6),t(72)),c=t(178),d={name:"Login",data:function(){return{isLoginModalActive:!0,name:"",word:""}},methods:{google:function(){var e=this;Promise.resolve().then(this.setPersistence).then((function(){return new Promise((function(e,n){var t=new r.a.auth.GoogleAuthProvider;console.log("auth"),r.a.auth().signInWithPopup(t).then((function(n){e(n)})).catch((function(e){e.code,e.message,e.email,e.credential;n(e)}))}))})).then((function(n){return new Promise((function(t,o){var r={},c=n.user;r.token=n.credential.accessToken,r.refreshToken=c.refreshToken,r.uid=c.uid,r.displayName=c.displayName,r.photoURL=c.photoURL,r.uid=c.uid,r.email=c.email,r.isNewUser=n.additionalUserInfo.isNewUser,r.providerId=n.additionalUserInfo.providerId,t(r),e.name=r.displayName}))}))},setPersistence:function(){return new Promise((function(e,n){r.a.auth().setPersistence(r.a.auth.Auth.Persistence.LOCAL).then((function(n){e()}))}))},saveMemos:function(){c.a.ref("test/").set(this.name)},onRejectted:function(e){this.$buefy.toast.open({duration:5e3,message:"ログインに失敗しました。",position:"is-bottom",type:"is-danger"}),this.isLoginModalActive=!1,console.log("onRejectted",e)}}},l=t(70),component=Object(l.a)(d,(function(){var e=this,n=e._self._c;return n(o.a,[n("button",{on:{click:e.google}},[n("span",[n("span",[e._v("Google")]),e._v(" "),n("span",[e._v(e._s(e.name))]),e._v(" "),n("button",{on:{click:e.saveMemos}},[e._v("botan")]),e._v(" "),n("span",[e._v(e._s(e.word))])])])])}),[],!1,null,null,null);n.default=component.exports}}]);