<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item>
            <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      fixed
      app
      width="400pt"
    >
      <v-list>
        <v-list-item>
            <v-list-item-title>{{now}}</v-list-item-title>
      </v-list-item>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
        <v-btn
        icon
        @click.stop="importMermaid"
      >
      ボタン
      </v-btn>
    <div class = "markdown">
      <Markdown :message='nodeMemoTitle' :id="nodeMemoId"></Markdown>
    </div>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Markdown from '~/pages/markdown.vue'
import firebase from "firebase"
import {firestore,database} from "~/plugins/firebase.js"

export default {
  name: 'DefaultLayout',
  props:{
    memotitle:{
        type: String,
      },
      },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      name: "",
      uId:"",
      title: 'Book Relation Map',
      nodeMemoTitle:"memo title",
      nodeMemoId:"",
      now:"",
    }
  },
  created: function(){    
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.name = user.displayName;
      this.uId = user.uid;
    });
    },
  computed:{
    vioo(event){
      return this.$store.getters['nodeTitle/getTitleListLen']
    }
    },
    watch: {
    vioo (newnow,oldnow) {
      this.$nextTick(() => {
        alert("old; "+ oldnow + "  new; "+newnow)
        console.log('変更されました')
        console.log(this.$store.state.nodeTitle.idList[this.vioo-1])
        this.importMermaid()
      })
    }
  },
  methods: {
    importMermaid(){
      alert( this.vioo)
      this.nodeMemoTitle = this.$store.state.nodeTitle.titleList[this.vioo-1]
      //alert(this.memotitle)
    },
  },
  components:{
    Markdown:Markdown,
  }
}
</script>
