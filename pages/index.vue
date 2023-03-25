<template>
  <div class="container">
          <v-btn v-if= "!isLogin" @click="google">
            google
          </v-btn>
    <Mermaid v-if="isLogin" :userName='name' :id="uId" ></Mermaid>
  </div>
</template>

<script>
import Mermaid from './mermaid.vue'
import firebase from "firebase";
import Cookies from 'universal-cookie';

export default {
  name:"Index",
  data() {
    return {
      isLoginModalActive: true,
      name: "",
      word: "",
      uId: "",
      isLogin:false,
    };
  },
  created: function(){    
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.name = user.displayName;
      this.uId = user.uid;
      this.isLogin = true;
      this.$store.commit("userInfo/setUserId",this.uId)
    });
  //     const auth = () => {
  //       return new Promise((resolve, reject) => {
  //         const authUI = new firebase.auth.GoogleAuthProvider();
  //         console.log("auth");
  //         // This gives you a the Google OAuth 1.0 Access Token and Secret.
  //         firebase
  //           .auth()
  //           .signInWithPopup(authUI)
  //           .then(result => {
  //             resolve(result);
  //           })
  //           .catch(error => {
  //             // Handle Errors here.
  //             const errorCode = error.code;
  //             const errorMessage = error.message;
  //             const email = error.email;
  //             const credential = error.credential;
  //             reject(error);
  //           });
  //       });
  //     };
  //     const getAccountData = result => {
  //       return new Promise((resolve, reject) => {
  //         let userObject = {};
  //         let user = result.user;
  //         userObject.token = result.credential.accessToken;
  //         userObject.refreshToken = user.refreshToken;
  //         userObject.uid = user.uid;
  //         userObject.displayName = user.displayName;
  //         userObject.photoURL = user.photoURL;
  //         userObject.uid = user.uid;
  //         userObject.email = user.email;
  //         userObject.isNewUser = result.additionalUserInfo.isNewUser;
  //         userObject.providerId = result.additionalUserInfo.providerId;
  //         resolve(userObject);
  //         this.name = userObject.displayName;
  //         this.uId = userObject.uid;
  //       });
  //     };
  //       const cookies = new Cookies();

  //       cookies.set('mermaid', 'mermaidMarkdown', { sameSite: 'strict' });
  //       console.log(cookies.get('mermaid')); // Pacman

  //    Promise.resolve()
  //       .then(this.setPersistence)
  //       .then(auth)
  //       .then(getAccountData)

          },
  methods: {
    // ** Google認証を行うときに呼び出される関数
    google() {
      // ** ② Google認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          const authUI = new firebase.auth.GoogleAuthProvider();
          console.log("auth");
          // This gives you a the Google OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then(result => {
              resolve(result);
              alert("signInWithRedirectです。")
            })
            .catch(error => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.email;
              const credential = error.credential;
              reject(error);
            });
        });
      };

      // ** ③ 認証後のユーザー情報を取得してオブジェクト化
      const getAccountData = result => {
        return new Promise((resolve, reject) => {
          let userObject = {};
          let user = result.user;
          userObject.token = result.credential.accessToken;
          userObject.refreshToken = user.refreshToken;
          userObject.uid = user.uid;
          userObject.displayName = user.displayName;
          userObject.photoURL = user.photoURL;
          userObject.uid = user.uid;
          userObject.email = user.email;
          userObject.isNewUser = result.additionalUserInfo.isNewUser;
          userObject.providerId = result.additionalUserInfo.providerId;
          resolve(userObject);
          this.name = userObject.displayName;
          this.uId = userObject.uid;
         this.$store.commit("userInfo/setUserId",this.uId)
        });
      };

      // ** 同期的に順番に処理を実行する
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        //.then(userObject => this.createPhotoURL(userObject))
        //.then(userObject => this.setPublicUserData(userObject))
        //.then(userObject => this.setPrivateUserData(userObject))
        //.then(userObject => this.setLocalUserData(userObject))
        //.catch(error => this.onRejectted(error));//上の４つのthenがないからここでエラー出てた。
    },
    // ** ① 認証状態を明示的にセットする
    setPersistence() {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)//おそらく、ここでログインの維持はできている。
          .then(result => {
            resolve();
          });
      });
    },
    // ** エラー処理
    onRejectted(error) {
      this.$buefy.toast.open({
        duration: 5000,
        message: `ログインに失敗しました。`,
        position: "is-bottom",
        type: "is-danger"
      });
      this.isLoginModalActive = false;
      console.log("onRejectted", error);
    }
   },
  components:{
    Mermaid:Mermaid,
  }
}
</script>

<style>
.container {
  top: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.sidebar {
  width: 60pt;
}

</style>
