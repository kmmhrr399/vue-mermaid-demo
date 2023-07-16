<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item>
            <v-list-item-title>My page ＜{{ name }}＞</v-list-item-title>
      </v-list-item>
      <v-list-item
          @click="createMap()"
        >
          <v-list-item-content>
            <v-list-item-title>Create New Map</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(mapName, i) in showMapNameList"
          :key="i"
          router
          exact
          @click.stop="changeMap(mapName.name,mapName.id)"
        >
          <v-list-item-content>
            <v-list-item-title v-if = "!editFlag">{{ mapName.name }}
              <v-icon @click.stop="deleteMap(mapName.id)">mdi-delete</v-icon>
              <v-icon @click.stop="changeEditFlag">mdi-pen</v-icon>
              </v-list-item-title>
            <v-list-item-title v-if = "editFlag">
              <input v-model = mapName.name />
              <v-icon @click.stop="changeEditMapName(mapName.name,i)">mdi-content-save-edit-outline</v-icon>
              </v-list-item-title>
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
      <!-- <v-btn
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
      </v-btn> -->
      <v-toolbar-title>{{ title }}:{{ showingMapName }}:{{ mapId }}</v-toolbar-title>
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
      width= 700px
    >
      <v-list>
        <!-- <v-list-item>
            <v-list-item-title>{{ uId }}</v-list-item-title>
      </v-list-item> -->
        <!-- <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item> -->
        <!-- <v-list-item>
        <v-btn
        icon
        @click.stop="importMermaid"
      >
      ボタン
      </v-btn>
      </v-list-item> -->
      <br>
      <v-list-item>
      <MermaidComponent/>
      </v-list-item>
      <v-list-item>
        <div class = "markdown">
          <Markdown :message='nodeMemoTitle' :id='nodeMemoId' :userId3 ='uId'></Markdown>
        </div>
      </v-list-item>
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
import MermaidComponent from '~/components/mermaidpalecompo.vue'
import Markdown from '~/components/markdown.vue'
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
      rightDrawer: true,
      name: "",
      uId:"",
      title: 'Book Relation Map',
      nodeMemoTitle:"memo title",
      nodeMemoId:"",
      now:"",
      mapNameList:[],
      showMapNameList:[],
      data:[],
      showingMapName:"",
      mapId:'',
      mapCount:0,
      editingMapName:"",
      editFlag:false,
    }
  },
  created: function(){    
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.name = user.displayName;
      this.uId = user.uid;

      database
      .ref("map/"+this.uId+"/mapName/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          this.mapNameList = result.val();
          console.log("defaultvueからmapName取得");
          console.log(this.mapNameList)
          const List = []
              for(let i = 0; i < this.mapNameList.length ;i++){
                  //alert(this.mapNameList[i].enable)
                if(this.mapNameList[i].enable){
                  List.push(this.mapNameList[i])
                }
              }
        this.showMapNameList = List
        }
      });
      database
      .ref("map/"+this.uId+"/mapCount/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          this.mapCount = result.val();
        }
      });
    });
    },
  computed:{
    vioo(event){
      return this.$store.getters['nodeTitle/getTitleListLen']
    },
    mapNames(){
      return this.$store.getters['mapData/getmapNameListLen']
    },
    
    },
    watch: {
    vioo (newnow,oldnow) {
      this.$nextTick(() => {
        alert("old; "+ oldnow + "  new; "+newnow)
        console.log('変更されました')
        console.log(this.$store.state.nodeTitle.idList[this.vioo-1])
        this.importMermaid()
      })
    },
    mapNames(newNum,oldNum){
    this.$nextTick(() => {
      this.showingMapName = this.$store.state.mapData.mapNameList[oldNum];
      this.mapId = this.$store.state.mapData.mapIdList[oldNum];
    })
  },
  showMapNameList(){
    this.$nextTick(() => {
      // this.showMapNameList = 0
      // for(let i = 0; i < this.mapNameList.length ;i++){
      //   if(this.mapNameList[i].enable){
      //     this.showMapNameList[i].push(this.mapNameList[i])
      //   }
      // }
      })
    },
  },
  methods: {
    importMermaid(){
      //alert( this.vioo + "defaultからのalert")
      this.nodeMemoTitle = this.$store.state.nodeTitle.titleList[this.vioo-1]
      //alert(this.memotitle)
    },
    changeMap(name,id){
      if(this.editFlag == false){alert("クリックしましたね")
      //ここにmapData.jsの情報を更新する処理を加える。
      this.$store.commit("mapData/setMapName",name)
      this.$store.commit("mapData/setMapId",id)
      } 
    },
    createMap(){
      alert("マップを新規作成します。")
      //①：DB > map > id > mapNameに新しく新しくデータを作成し、mapNameを更新する。
      //②：①で追加したmapNameをidテーブルに追加する。
      this.mapCount = this.mapCount+1
      this.mapNameList.push({
        id:this.mapCount,
        name:"created Map",
        enable:true
      })

      database
      .ref("map/"+this.uId+"/mapName/")
      .set(this.mapNameList);

      database
      .ref("map/"+this.uId+"/mapCount/")
        .set(this.mapCount);
    },
    changeEditMapName(newMapName,int){
      if(this.editFlag ===true){
        if(this.mapNameList[int] != newMapName){
          this.mapNameList[int].name = newMapName
          database
            .ref("map/"+this.uId+"/mapName/")
            .set(this.mapNameList);
          this.$store.commit("mapData/setMapName",newMapName)
          this.$store.commit("mapData/setMapId",this.mapId)
        }
        //②：③で十分"map/"+this.uId+"/mapName/"を更新して、this.mapNameListを新しいものに
        //③：引数に変更前のマップ名を控えさせて、変更された際に変更前の名前をthis.mapNameListから見つけ出し、新しいものに置き換えて更新
      }
      else{

      }
      this.editFlag = !this.editFlag;
    },
    alertI(int){
      //alert(int)
    },
    changeEditFlag(){
      this.editFlag = !this.editFlag;
    },
    deleteMap(id){
      for(let i = 0;i<this.mapNameList.length;i++){
        if(id === i ){
        this.mapNameList[i].enable = false
        }
      }
    },
  },
  components:{
    Markdown:Markdown,
    MermaidComponent:MermaidComponent,
  }
}
</script>
