<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      width="100pt"
      fixed
      app
    >
    <v-list>
      <v-list-item>
            <v-list-item-title>{{ name}}</v-list-item-title>
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
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :fixed="fixed" app>
      <span>&copy; km {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      name: "",
      uId:"",
      title: 'Book Relation Map'
    }
  },
    created: function(){    
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.name = user.displayName;
      this.uId = user.uid;
    });
    }
}
</script>
