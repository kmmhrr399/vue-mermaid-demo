<template>
  <div class="container">
    <div class="titled">
      {{userInfo}}
      <div v-if="editParetto">
      <div class="inputt">
        NO:{{tgnumber}}  ||  Node Name:{{tgtparents}}
      </div>
      <!-- <div class="inputt">
        NO:
        <input v-model=  "tgnumber" class="compwht" />
      </div> -->
      <div class="inputt">
        Add :<input v-model= "newText" class="compwht" />
      </div>
        <div class = "inputt">
          Link:
        <!-- <input v-model = "nextId" class="compwht" /> -->
        <select v-model="nextId">
        <option disabled value="Please Select">Please Select</option>
        <option v-for="datum in data"
        v-bind:value="datum.text" 
        :key="datum.key">
        {{datum.text}}
        </option>
      </select>
        </div>
        <div class = "inputt">
          Edit:
        <input v-model = "editText" class="compwht" />
        </div>
      <!--<div>
        <li v-for="list in linkTextList" :key="list.key">
          {{list.next}} : {{list.link}}
        </li>
      </div>-->
      <div class = "inputt">
        <select v-model="PS">
        <option disabled value="Please Select">Please Select</option>
        <option v-for="list in linkTextList"
        v-bind:value="list.link" 
        :key="list.key">
        {{list.key}}{{list.next}} :
        </option>
      </select>
      <input v-model = "nextLinkText" class="compwht" />
      </div>
      <div class = "inputt">
        edge:
        <select v-model="edgeText">
        <option disabled value="Please Select">Please Select</option>
        <option v-for="edge in edges"
        v-bind:value="edge.type" 
        :key="edge.key">
        {{edge.type}}
        </option>
      </select>
      <button :disabled="isButtonAble" class="compwht" @click="changeEdgeType">
          changeEdge
        </button>
      </div>
      <br />
      check parent exist :{{ isexistparent }}
        <button class="compwht" @click="saveNode">
          Save
        </button>
      <br />
        <button :disabled="isButtonAble" class="compwht" @click="easydelete">
          Delete
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="addNewNode">
          Add
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="addNext">
          Link
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="editNode">
          Edit
        </button>
      <br />
      <button :disabled="isButtonAble" class="compwht" @click="unLink">
          Unkink
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="addLinkDetail">
          EditLinkDetail
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {database} from "~/plugins/firebase.js"
export default {
  name:"MermaidComponent",
  props:
    {
      tgtparents:{
        type: String,
      },
      tgnumber:{
        type: String,
      },
      data:{
        type: Array,
      },
    },
  data() {
    return {
      mapNameList:[],
      mapName :'',
      mapId:'',
      id :"",
      editParetto:true,
      //tgtparents: '',
      newText: '',
      //tgnumber: '',
      nextId: '',
      editText: '',
      PS :'Please Select',
      nextLinkText: '',
      edgeText: '',
      linkTextList: [],
      currentmaxid:4,
      deleteCount:0,
      existCount:4,
      totalCount:0,
      editCount:0,
      linkTextListEditNum :0,
      nodeMemoTitle:'nodeMemo...',
      nodeMemoId:"1",
      title: 'vue-mermaid',
      mermaid: {
        theme: 'default',
        startOnLoad: !1,
        securityLevel: 'loose'
      },
      edges: [
        { type: "default"},
        { type: "round"},
        { type: "circle"},
        //{ type: "asymetric"},
        { type: "rhombus",jpn:"菱形"}
      ]

    }
  },
  created: function() {
    console.log("mermaidModalpalecompo")
    // this.getMapData()
    // this.getData()
    //this.tgtparents = this.$store.state.nodeTitle.titleList[this.vioo-1]
    //this.tgnumber = this.$store.state.nodeTitle.idList[this.vioo-1]
    this.currentmaxid = this.data.length
    this.existCount = this.data.length
    // this.filterByText(this.tgtparents)
    // this.filterById(this.tgnumber)
    //this.deleteCount = this.$store.state.mapData.DeleteCountLen[this.DeleteCountLen-1]
    this.mapName = this.$store.state.mapData.mapNameList[this.mapNames-1]
    this.mapId = this.$store.state.mapData.mapIdList[this.mapNames-1]
    this.linkTextList = JSON.parse(JSON.stringify(this.$store.state.nodeTitle.linkTextList))
    
  },
  computed: {
    countid(event){
      return this.deleteCount + this.existCount
    },
    isexistparent(event) {
      return !this.isButtonAble ? 'OK' : 'NG'
    },
    isButtonAble(event) {
      return this.filterByText(this.tgtparents) === null
    },
    nowNextA(event) {
      return this.data[0].next
    },
    vioo(event){
      return this.$store.getters['nodeTitle/getTitleListLen']
    },
    mapDataEditCount(event){
      return this.$store.getters['mapData/getMapDataEditCount']
    },
    DeleteCountLen(){
      return this.$store.getters['mapData/getDeletCountListLen']
    },
    userInfo(){
      return this.$store.getters['userInfo/getUserId']
    },
    linkTextListNum(){
      return this.$store.getters['nodeTitle/getLinkTextListCount']
    },
    mapNames(){
      return this.$store.getters['mapData/getmapNameListLen']
    }
    // nextLinkText(){
    //   if(this.linkTextList.length = 0){
    //     return 'Please Select'
    //   }
    //   else {
    //     return 
    //   }
    // },
  },
  watch: {
    vioo (newnow,oldnow) {
      //if(oldnow == 0)this.getData()
      this.$nextTick(() => {
        console.log("old; "+ oldnow + "  new; "+newnow)
        console.log('compにて変更されました')
        console.log(this.$store.state.nodeTitle.idList[this.vioo-1])
        this.tgtparents = this.$store.state.nodeTitle.titleList[this.vioo-1]
        this.tgnumber = this.$store.state.nodeTitle.idList[this.vioo-1]
        this.filterByText(this.tgtparents)
        this.filterById(this.tgnumber)
      })
    },
    // mapDataListLen (newnow,oldnow) {
    //   this.$nextTick(() => {
    //     console.log("old; "+ oldnow + "  new; "+newnow)
    //     console.log('変更されました')
    //     console.log(this.$store.state.mapData.mapDataList[this.mapDataListLen-1])
    //     this.ketugou()
    //   })
    // },
    DeleteCountLen(){
      this.$nextTick(() => {
        console.log("old; "+ oldnow + "  new; "+newnow)
        console.log('compにてデリートカウントが変更されました')
        console.log(this.$store.state.mapData.mapDataList[this.mapDataListLen-1])
        this.deleteCount = this.$store.state.mapData.DeleteCountLen[this.DeleteCountLen-1]
    })
  },
  userInfo(){
    this.$nextTick(() => {
      //データの取得はここでやってる。
      alert("this.getMapData()を処理します")
        this.getMapData()
    })
  },
  mapNames(newNum,oldNum){
    this.$nextTick(() => {
      alert("this.getData()を処理します")
      //default.vue>changeEditMapNameでマップ名が変更された場合にgetDataを処理させないためのIF文
        this.mapName = this.$store.state.mapData.mapNameList[oldNum]
        this.mapId = this.$store.state.mapData.mapIdList[oldNum]
        if(oldNum > 0){
          if(this.$store.state.mapData.mapIdList[oldNum] != this.$store.state.mapData.mapIdList[oldNum-1]){
            this.getData()
          }
        }
        else{
          this.getData()
        }
    })
  },
  linkTextListNum(){
    this.$nextTick(() => {
        this.linkTextList = JSON.parse(JSON.stringify(this.$store.state.nodeTitle.linkTextList))
        console.log(this.linkTextList )
    })
  },
  PS (){
    this.$nextTick(() => {
      this.nextLinkText = this.PS
    })
  }
  },
  methods: {
    filterByText(text) {
      const dataarr = this.data; //export default のdata内にあるdata配列をdataarrに入れる
      for (let i = 0; i < this.currentmaxid; i++) {
        if (dataarr[i].text === text) return dataarr[i]
      }//dataarrにあるテキストと入力したテキストが一致したら、この関数は一致したオブジェクトの内容をもつ。
      return null
    },
    filterById(id) {
      const dataarr = this.data;
      for (let i = 0; i < this.currentmaxid; i++) {
        if (dataarr[i].id == id) return dataarr[i]
      }
      return null
    },
    changeEdgeType(){
      const parent = this.filterByText(this.tgtparents)
      const tagetId = parent.id
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      for (let i = 0; i < this.existCount - 1; i++) {
        if (node2[i].id === tagetId) {
            node2[i].edgeType = this.edgeText
            alert("edgetypeを変更しました。")
        }
      }
      this.clearText()
      this.ketugou(node2);
    },
    addNewNode(event) {
      const parent = this.filterByText(this.tgtparents)
      const tagetId = parent.id
      const newtext = this.newText === '' ? 'new_el' : this.newText
      this.$store.commit("mapData/setNodeChanged",newtext)
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      console.log("mermaidModalpalecompo\n"+node2)
      if(!this.checkNodeName(this.newText,node2)){
        this.clearText()
        return null
      }
      //画面に描画するための”data”の中身を削除する。
      this.currentmaxid++
      this.existCount++
      this.totalCount = this.existCount + this.deleteCount;
      console.log(this.totalCount +" = total\n"+this.existCount+" = exist\n"+this.deleteCount + " = delete")
      //目的ののーどIDを見つけ出し、もし初めてリンクするなら、リンクという配列を作る。
      for (let i = 0; i < this.existCount - 1; i++) {
        if (node2[i].id === tagetId) {
          const newel = String(this.currentmaxid)
          if (node2[i].next === undefined) {
            node2[i].next = []
            node2[i].link = []
          }
          node2[i].next.push(this.totalCount.toString())
          node2[i].link.push('-->')
        }
      }
      const newNode = {
        id: this.totalCount.toString(),
        text: newtext,
        next: [],
        editable: true
      }
      node2.push(newNode)
      this.clearText()
      this.ketugou(node2);
    },

    clearText(event){
      //this.tgtparents =""
      this.newText=""
      //this.tgnumber =""
      this.nextId =""
      this.editText =""
    },
    addNext(event) {
      console.log("リンク開始")
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const child = this.filterByText(this.nextId)
      console.log(child.id.toString()+"が親のnextに追加されます")
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      //this.data.length =1
      for (let i = 0; i < node2.length; i++) //該当するID探して、nextに追加する
      {
        if (node2[i].id === tagetId) //該当するIDを見つけた時
        {
          console.log("該当するノードの配列上の番号は  "+tagetId+"です。")
          //const newel = String(this.nextId) //newelに新しいIDの文字列を加える。既存のノードにnextを追加するときはここをいじる
          if (node2[i].next === undefined) {
            node2[i].next = []
            node2[i].link = []
          }
          node2[i].next.push(child.id.toString())
          node2[i].link.push('-->')
          break;
        }
      }
      this.clearText()
      this.ketugou(node2)
    },
    editNode(event) {
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      if(!this.checkNodeName(this.editText,node2)){
        this.clearText()
        return null
      }
      for (let i = 0; i < node2.length; i++) //該当するID探して、nextに追加する
      {
        if (node2[i].id === tagetId) //該当するIDを見つけた時
        {
          node2[i].text=this.editText
          break;
        }
      }
      this.clearText()
      this.ketugou(node2)
    },
    saveNode() {
      database
        .ref("map/"+this.id+"/map/" + this.mapId + "/nodes/")
        .set(this.data);

      database
        .ref("map/"+this.id+"/map/" + this.mapId + "/deleteCount/")
        .set(this.deleteCount);
      
      database
        .ref("map/"+this.id+"/map/" + this.mapId + "/name/")
        .set(this.mapName);
    },
    unLink(event){
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const child = this.filterByText(this.nextId)
      console.log(child.id.toString()+" 番の"+ child.text+"が親のノードから外されます")
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      this.data.length =1
      for (let i = 0; i < node2.length; i++) //該当するID探して、nextに追加する
      {
        if (node2[i].id === tagetId && 'next' in node2[i]) //該当するIDを見つけた時
        {
          console.log("該当するノードの配列上の番号は  "+tagetId+"です。")
          //const newel = String(this.nextId) //newelに新しいIDの文字列を加える。既存のノードにnextを追加するときはここをいじる
          if (node2[i].next.includes(child.id.toString())) {
            console.log(node2[i].next.indexOf(child.id.toString()))
            node2[i].next.splice(node2[i].next.indexOf(child.id.toString()),1)
            break;
          }
          else{
            alert("そのノードとは繋がっていません。")
            //break;
          }
        }
        else{
          alert("そのノードには繋がっているノードがありません。")
          break;
        }
      }
      this.clearText()
      this.ketugou(node2)

    },
    easydelete(event){
      alert("削除を始めます。")
      var deleteObjNo = 0
      const deleteSize = this.deleteCount + this.existCount
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      this.data.splice(1,this.data.length-1)
      //this.data[0].next.splice(0,this.data[0].next.length)
      console.log(tagetId+"番を削除します"+'\n  deleteSize is'+deleteSize)
        for(let i =0; i < node2.length ;i++)
        {
          //console.log(i+1+"回目。")
          if (node2[i].id === tagetId) //該当するIDを見つけた時
          {
            alert("削除対象を見つけました。")
            if(node2[i].next === undefined || node2[i].next.length == 0){
              deleteObjNo = i;
              for(let k =0; k < this.currentmaxid;k++)
              {
                if(node2[k].next !== undefined &&
                node2[k].next.includes(i.toString()))
                {
                  console.log(k+" 回目  このノードと繋がっているノードから対象を削除します。")
                  this.serchAndDeleteNext(node2[k],tagetId)
                }
              }
            }
            else{
              alert("このノードは他のノードと繋がっているため、削除できません。")
            }
          }
        }
      if(deleteObjNo != 0){
                alert(deleteObjNo+" 番のノードを削除します。")
                node2.splice(deleteObjNo,1)
                //alert(deleteObjNo+" 番のノードを削除しました。node1の長さは" + this.node1.length + "です。")
              }
      alert("削除を終了します。")
      this.deleteCount++
      this.clearText()
      this.ketugou(node2)
    },
    ketugou(data){
      //マップ内のノードの変更をマップに反映させる。
      //直で書き換えると変えている途中の処理により、マップ表示ができなくなる。
      console.log("currentmaxidを再採番し、結合します")
      this.currentmaxid = data.length
      this.data[0]=data[0]
      this.data.length = 1
      for(let i = 1;i<data.length;i++)//一つ目のノードを残すためにi=1にしてます。
      {
        //alert("結合pushします。")
        this.data.push(data[i])
      }
      alert("コンポーネントで結合終えました。")
      console.log(data)
      this.$store.commit("mapData/setMapData",this.data)
      this.$store.commit("mapData/setMapDataEditCount",this.editCount)
      alert("ストアに登録できました。" + this.$store.state.mapData.mapDataEditCount)
      console.log(this.$store.state.mapData.mapDataList)
      //this.node1.splice(0,this.node1.length)
      this.editCount++
      alert("this.editCountの値は " + this.editCount)
    },
    serchAndDeleteNext(nextList,deletId){
      //easyDleatに使われている処理、削除する対象の下にノードがついている場合、配下のノードも削除する。
      alert("Next整理 nextList.length = " + nextList.next.length )
      for(let ii=0;ii<nextList.next.length;ii++){
        console.log("Next,Link整理 For開始")
         if(nextList.next[ii] == deletId){
          alert(nextList.next[ii]+"; nextList"+"  "+deletId+"; deleteId")
          nextList.next.splice(ii,1)
          nextList.link.splice(ii,1)
         }
      }
    },
    checkNodeName(nodeName,array){
      //ノード名が同一のものがある場合検索に失敗するため
      for(let i = 0; i < array.length;i++){
        if(nodeName === array[i].text){
          alert("ノードの名前が重複してします。別名で登録してください")
          return false
        }
      }
        return true
    },
    getData(){
      alert(this.mapId + " = mapId")
      //DBからユーザーID内にあるマップ名が等しいものを持ってくる。
      this.id = this.$store.state.userInfo.userId;
      database
      .ref("map/"+this.id+"/map/"+ this.mapId+"/nodes/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          const dataArr = result.val();
          this.existCount = dataArr.length;
          this.data.splice(1);
          this.ketugou(dataArr);
        }
        //新しくマップ名を作成した時、マップに登録されているノードがないため
        //初期マップノードデータ
        else{
          const dataArr = [
            {id: "1",text: "A",link: ["-->"],next: ["2"],editable: true},
            { id: "2", text: "B", editable: true,},];
          this.existCount = dataArr.length;
          this.ketugou(dataArr);
        }
      });
    database
      .ref("map/"+this.id+"/map/"+ this.mapId+"/deleteCount/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          this.deleteCount = result.val();
          this.$store.commit("mapData/setDeleteCount",this.deleteCount)
        }
      });
    },
    addLinkDetail(){
      //リンクの詳細を追加する処理、Please Selectかつ-->だけの時は何もしない。
      //編集され-->が削除されているときは保存された時の文字列の前に「--」、後に「-->」をつける処理をする
      if(this.nextLinkText == "Please Select" && this.nextLinkText == "-->"){
        return
      }
      else{
        this.nextLinkText = this.nextLinkText.replace(/>/g,"")
        this.nextLinkText = this.nextLinkText.replace(/-/g,"")
        this.nextLinkText ='--' + this.nextLinkText + '-->'
      }
      //PSの値が選択されたノードのLinkプロパティの何番目（０から）になるか算出して、置き換える
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const child = this.filterByText(this.nextId)
      const node2 = JSON.parse(JSON.stringify(this.data.concat()))
      this.data.length =1
      for (let i = 0; i < node2.length; i++) //該当するID探して、nextに追加する
      {
        if (node2[i].id === tagetId) //該当するIDを見つけた時
        {
          alert("該当ID発見")
          for (let n = 0; n < node2[i].next.length; n++) //該当するID探して、nextに追加する
          {
            //if(){}
              node2[i].link[0] = this.nextLinkText
              alert(node2[i].link[n] + "  " +this.nextLinkText)
              //break;
          }
        }
      }
      this.clearText()
      this.ketugou(node2)
    },
    getMapData(){
      //DBからユーザーID内にあるマップ名が等しいものを持ってくる。
      this.id = this.$store.state.userInfo.userId;
      database
      .ref("map/"+this.id+"/mapName/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          this.mapNameList= JSON.parse(JSON.stringify(result.val()));
          this.$store.commit("mapData/setMapName",this.mapNameList[0].name)
          this.$store.commit("mapData/setMapId",this.mapNameList[0].id)
          alert("mermaidpalecompからマップデータ取得しました。  \n最初のマップ名は " + this.mapNameList[0].name + "\n 最初のマップIDは " + this.mapNameList[0].id)
          //mapData.jsのstare情報を更新する。似た処理がログイン関係にあったはず。
        }
      });

    }
  },
  components:{
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

.titled {
  width: 80%;
  margin: auto;
  align-items: left;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-size: 18px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.inputt {
  margin-top: 10px;
}

.compwht {
  background-color: #c7c7c7;
  margin-top: 5px;
}

.v-application--wrap {
  background-color: #fff;
  /* background-color: #979797; */
}

.mermaid{
  width: flex;
}

.markdown{
  top: 0pt;
}

</style>
