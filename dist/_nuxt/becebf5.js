(window.webpackJsonp=window.webpackJsonp||[]).push([[6,5,7,8],{353:function(t,e,n){var content=n(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(35).default)("abd889ca",content,!0,{sourceMap:!1})},355:function(t,e,n){"use strict";n(353)},356:function(t,e,n){var o=n(34)(!1);o.push([t.i,"\n.markdown-editor {\n    width: 100%;\n    height: 100%;\n}\n",""]),t.exports=o},361:function(t,e,n){var content=n(372);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(35).default)("7f6e022a",content,!0,{sourceMap:!1})},363:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{text:"",markdownContent:"",editorOn:!0}},methods:{handleChange:function(data){this.markdownContent=data.htmlContent},changeEditorOn:function(){return this.editorOn=!this.editorOn}}},r=n(80),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"},[e("button",{on:{click:t.changeEditorOn}},[t._v("edit")]),t._v(" "),t.editorOn?e("m-editor",{attrs:{lang:"en"},on:{"on-change":t.handleChange},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}):t._e(),t._v(" "),t.editorOn?t._e():e("div",{staticClass:"m-editor-preview",domProps:{innerHTML:t._s(t.markdownContent)}})],1)}),[],!1,null,null,null);e.default=component.exports},364:function(t,e,n){"use strict";n.r(e);n(38),n(7);var o=n(362),r={data:function(){return{isLoginModalActive:!0,name:""}},methods:{google:function(){var t=this;Promise.resolve().then(this.setPersistence).then((function(){return new Promise((function(t,e){var n=new o.a.auth.GoogleAuthProvider;console.log("auth"),o.a.auth().signInWithPopup(n).then((function(e){t(e)})).catch((function(t){t.code,t.message,t.email,t.credential;e(t)}))}))})).then((function(e){return new Promise((function(n,o){var r={},d=e.user;r.token=e.credential.accessToken,r.refreshToken=d.refreshToken,r.uid=d.uid,r.displayName=d.displayName,r.photoURL=d.photoURL,r.uid=d.uid,r.email=d.email,r.isNewUser=e.additionalUserInfo.isNewUser,r.providerId=e.additionalUserInfo.providerId,n(r),t.name=r.displayName}))})).then((function(e){return t.createPhotoURL(e)})).then((function(e){return t.setPublicUserData(e)})).then((function(e){return t.setPrivateUserData(e)})).then((function(e){return t.setLocalUserData(e)})).catch((function(e){return t.onRejectted(e)}))},setPersistence:function(){return new Promise((function(t,e){o.a.auth().setPersistence(o.a.auth.Auth.Persistence.LOCAL).then((function(e){t()}))}))},onRejectted:function(t){this.$buefy.toast.open({duration:5e3,message:"ログインに失敗しました。",position:"is-bottom",type:"is-danger"}),this.isLoginModalActive=!1,console.log("onRejectted",t)}}},d=n(80),component=Object(d.a)(r,(function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{active:t.isLoginModalActive,width:420,scroll:"keep"},on:{"update:active":function(e){t.isLoginModalActive=e}}},[e("button",{on:{click:t.google}},[e("span",{staticClass:"icon"},[e("i",{staticClass:"fab fa-google"}),t._v("\n       \n      "),e("span",[t._v("Google")]),t._v(" "),e("span",[t._v(t._s(t.name))])])])])}),[],!1,null,null,null);e.default=component.exports},365:function(t,e,n){"use strict";n.r(e);var o={props:{message:{type:String},id:{type:String}},data:function(){return{markdownOption:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!0,htmlcode:!0,save:!0,subfield:!0,preview:!0},editorOn:!1,model:""}},computed:{convert:function(){}},methods:{changeEditorOn:function(){return this.editorOn=!this.editorOn}}},r=(n(355),n(80)),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"markdown-editor"},[e("button",{on:{click:t.changeEditorOn}},[t._v("edit")]),t._v(" "),t.editorOn?e("div",[e("h3",[t._v(t._s(t.id))]),t._v(" "),e("mavon-editor",{attrs:{toolbars:t.markdownOption,language:"en"},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1):t._e()])}),[],!1,null,null,null);e.default=component.exports},371:function(t,e,n){"use strict";n(361)},372:function(t,e,n){var o=n(34)(!1);o.push([t.i,"\n.container {\n  top: 10px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n.titled {\n  width: 60%;\n  margin: auto;\n  align-items: left;\n  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n  display: block;\n  font-size: 20px;\n  color: #35495e;\n  letter-spacing: 1px;\n}\n.subtitle {\n  font-weight: 300;\n  font-size: 42px;\n  color: #526488;\n  word-spacing: 5px;\n  padding-bottom: 15px;\n}\n.links {\n  padding-top: 15px;\n}\n.inputt {\n  margin-top: 10px;\n}\n.compwht {\n  background-color: #c7c7c7;\n  margin-top: 5px;\n}\n.v-application--wrap {\n  background-color: #fff;\n  /* background-color: #979797; */\n}\n.mermaid{\n  width: flex;\n}\n\n",""]),t.exports=o},376:function(t,e,n){"use strict";n.r(e);n(44),n(7),n(81),n(50);var o=n(365),r=n(363),d=n(364),l={data:function(){return{tgtparents:"",newText:"",tgnumber:"",nextId:"",editText:"",currentmaxid:1,deleteCount:1,existCount:3,nodeMemoTitle:"nodeMemo...",nodeMemoId:"1",title:"vue-mermaid",mermaid:{theme:"default",startOnLoad:!1,securityLevel:"loose"},data:[{id:"1",text:"A",editable:!0}],node1:[]}},computed:{countid:function(t){return this.deleteCount+this.existCount},isexistparent:function(t){return this.isButtonAble?"NG":"OK"},isButtonAble:function(t){return null===this.filterByText(this.tgtparents)},nowNextA:function(t){return this.data[0].next}},methods:{alertNode:function(t){var data=this.filterById(t);alert("clicked node = "+data.text+"\n  number is"+data.id),this.tgtparents=data.text,this.tgnumber=data.id,this.nodeMemo=data.text},filterByText:function(text){for(var t=this.data,i=0;i<this.currentmaxid;i++)if(t[i].text===text)return t[i];return null},filterById:function(t){for(var e=this.data,i=0;i<this.currentmaxid;i++)if(e[i].id===t)return e[i];return null},addNewNode:function(t){var e=this.filterByText(this.tgtparents).id,n=""===this.newText?"new_el":this.newText;this.node1=this.data.concat(),this.data.length=1,this.currentmaxid++;for(var i=0;i<this.currentmaxid-1;i++)if(this.node1[i].id===e){var o=String(this.currentmaxid);void 0===this.node1[i].next&&(this.node1[i].next=[]),this.node1[i].next.push(o)}var r={id:this.currentmaxid.toString(),text:n,editable:!0};this.node1.push(r),this.clearText(),this.ketugou(),this.node1.length=0},clearText:function(t){this.tgtparents="",this.newText="",this.tgnumber="",this.nextId=""},addNext:function(t){var e=this.filterByText(this.tgtparents).id,n=this.filterByText(this.nextId);this.node1=this.data.concat(),this.data.length=1;for(var i=0;i<this.currentmaxid;i++)if(this.node1[i].id===e){String(this.nextId);void 0===this.node1[i].next&&(this.node1[i].next=[]),this.node1[i].next.push(n.id)}this.clearText(),this.ketugou(),this.node1.length=0},editNode:function(t){for(var e=this.filterByText(this.tgtparents).id,i=0;i<this.currentmaxid;i++)this.data[i].id===e&&(this.data[i].text=this.editText);this.clearText()},deleteNode:function(t){for(var e=this.filterByText(this.tgtparents).id,i=0;i<this.currentmaxid;i++)this.data[i].id===e&&(void 0===this.data[i].next?alert("このノードを削除します。"):alert("このノードは他のノードと繋がっているため、削除できません。"));this.clearText()},check:function(t){var e=this.filterByText(this.tgtparents);e.id;void 0!==e.next?alert("このノードは他のノードと繋がっているため、削除できません。"):alert("このノードを削除します。")},easydelete:function(t){this.data.slice(1,1),alert("最後の項目を削除しました"),this.currentmaxid--},ketugou:function(t){alert("結合します");for(var i=1;i<this.node1.length;i++)this.data.push(this.node1[i])}},components:{markdown:o.default,eMark:r.default,login:d.default}},c=(n(371),n(80)),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("login"),t._v(" "),e("div",{staticClass:"titled"},[e("div",{staticClass:"inputt"},[t._v("\n      Set Parent :\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tgtparents,expression:"tgtparents"}],staticClass:"compwht",domProps:{value:t.tgtparents},on:{input:function(e){e.target.composing||(t.tgtparents=e.target.value)}}})]),t._v(" "),e("div",{staticClass:"inputt"},[t._v("\n      NO:\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tgnumber,expression:"tgnumber"}],staticClass:"compwht",domProps:{value:t.tgnumber},on:{input:function(e){e.target.composing||(t.tgnumber=e.target.value)}}}),t._v(" "),e("button",{staticClass:"compwht",attrs:{disabled:t.isButtonAble},on:{click:t.deleteNode}},[t._v("\n        Delete\n      ")])]),t._v(" "),e("div",{staticClass:"inputt"},[t._v("\n      Set Text : "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newText,expression:"newText"}],staticClass:"compwht",domProps:{value:t.newText},on:{input:function(e){e.target.composing||(t.newText=e.target.value)}}}),t._v(" "),e("button",{staticClass:"compwht",attrs:{disabled:t.isButtonAble},on:{click:t.addNewNode}},[t._v("\n        Add\n      ")])]),t._v(" "),e("div",{staticClass:"inputt"},[t._v("\n        Link:\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.nextId,expression:"nextId"}],staticClass:"compwht",domProps:{value:t.nextId},on:{input:function(e){e.target.composing||(t.nextId=e.target.value)}}}),t._v(" "),e("button",{staticClass:"compwht",attrs:{disabled:t.isButtonAble},on:{click:t.addNext}},[t._v("\n        Link\n      ")])]),t._v(" "),e("div",{staticClass:"inputt"},[t._v("\n        Edit:\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.editText,expression:"editText"}],staticClass:"compwht",domProps:{value:t.editText},on:{input:function(e){e.target.composing||(t.editText=e.target.value)}}}),t._v(" "),e("button",{staticClass:"compwht",attrs:{disabled:t.isButtonAble},on:{click:t.editNode}},[t._v("\n        Edit\n      ")])]),t._v(" "),e("br"),t._v("\n    check parent exist :"+t._s(t.isexistparent)+"\n    "),e("button",{staticClass:"compwht",attrs:{disabled:t.isButtonAble},on:{click:t.check}},[t._v("\n        check\n      ")]),t._v(" "),e("button",{staticClass:"compwht",on:{click:t.easydelete}},[t._v("\n        EasyDelete\n      ")]),t._v(" "),e("button",{staticClass:"compwht",on:{click:t.ketugou}},[t._v("\n        結合\n      ")]),t._v(" "),e("vue-mermaid",{staticClass:"mermaid",attrs:{nodes:t.data,config:t.mermaid,type:"graph TD"},on:{nodeClick:t.alertNode}})],1),t._v(" "),e("div",{staticClass:"markdown"},[e("markdown",{attrs:{message:t.nodeMemoTitle,id:t.nodeMemo}})],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);