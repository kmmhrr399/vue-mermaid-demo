<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      width="100pt"
      fixed
      app
    >
    <v-list>
      <v-list-item>
            <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
      </v-btn> -->
      <v-btn
        @click.stop="a">
    ボタン
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      width="10pt"
      fixed
    >
    <v-list>
      <v-list-item>
            <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; km {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase"
import {firestore,database} from "~/plugins/firebase.js"

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      name: "",
      uId:"",
      mapNameList:["tizu","mappu"],
      title: 'Book Relation Map',
      miniVariant: false,
    }
  },
    created: function(){    
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.name = user.displayName;
      this.uId = user.uid;
    });
    // database
    //   .ref(this.id)//thisはuserにかかっている
    //   .once("value")
    //   .then(result => {
    //     if (result.val()) {
    //       this.mapNameList = result[0].val();
    //     }
    //   });
    },
    methods:{
      a(){
        database
        .ref(this.uId+"/mapName/")
        .set(this.mapNameList);
    },
    }
}
</script>
