<template>
  <div class="container">
    <div class="titled">
      <h5>{{userName}} {{id}}</h5>
      <MermaidComponent />
      <v-btn @click="editParetto = !editParetto">
        編集
      </v-btn>
      <div v-if="editParetto">
      <div class="inputt">
        Set Parent:
        <input v-model="tgtparents" class="compwht" />
      </div>
      <div class="inputt">
        NO:
        <input v-model="tgnumber" class="compwht" />
        <button class="compwht" @click="saveNode">
          Save
        </button>
      </div>
      <div class="inputt">
        Set Text : <input v-model="newText" class="compwht" />
        <button :disabled="isButtonAble" class="compwht" @click="addNewNode">
          Add
        </button>
      </div>
        <div class = "inputt">
          Link:
        <input v-model="nextId" class="compwht" />
        <button :disabled="isButtonAble" class="compwht" @click="addNext">
          Link
        </button>
      <button class="compwht" @click="unLink">
          Unkink
        </button>
        </div>
        <div class = "inputt">
          Edit:
        <input v-model="editText" class="compwht" />
        <button :disabled="isButtonAble" class="compwht" @click="editNode">
          Edit
        </button>
        </div>
      <br />
      check parent exist :{{ isexistparent }}
              <button :disabled="isButtonAble" class="compwht" @click="easydelete">
          EasyDelete
        </button>
        <button class="compwht" @click="ketugou">
          結合
        </button>
      </div>
    <vue-mermaid
        class = "mermaid"
        :nodes="data"
        :config="mermaid"
        type="graph TD"
        @nodeClick="alertNode"
      ></vue-mermaid>
    </div>
  </div>
</template>

<script>
import MermaidComponent from '~/components/mermaidpalecompo.vue'
import {database} from "~/plugins/firebase.js"
export default {
  name:"Mermaid",
  props:
    {
      userName:{
        type: String,
      },
      id:{
        type: String,
      }
    },
  data() {
    return {
      editParetto:false,
      tgtparents: '',
      newText: '',
      tgnumber: '',
      nextId: '',
      editText: '',
      currentmaxid:6,
      deleteCount:0,
      existCount:6,
      totalCount:0,
      nodeMemoTitle:'nodeMemo...',
      nodeMemoId:"1",
      title: 'vue-mermaid',
      mermaid: {
        theme: 'default',
        startOnLoad: !1,
        securityLevel: 'loose'
      },
      data: [
         {
          id: "1",
          text: "A",
          link: "---",
          next: ["2"],
          editable: true,
          style: "fill:#f9f,stroke:#333,stroke-width:4px"
        },
        { id: "2", text: "B", edgeType: "circle", next: ["3"] },
        { id: "3", text: "C", next: ["4", "6"], link: ["--yes-->","-->"], },
        { id: "4", text: "D", link: ["-- This is the text ---"], next: ["5"] },
        { id: "5", text: "E" },
        { id: "6", text: "F" }
      ],
      node1:[
      ]
    }
  },
  created: function() {
      // this.node1 = this.$store.state.mapData.mapDataList;
      // this.ketugou()
      // this.existCount = this.node1.length;
      database
      .ref(this.id+"/map/deleteCount/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          this.deleteCount = result.val();
        }
      });
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
    mapDataEditCount(event){
      return this.$store.getters['mapData/getMapDataEditCount']
    },
    changedNodeElement(){
      return this.$store.getters['mapData/getNodechangedListLen']
    }
  },
   watch: {
    mapDataEditCount (newnow,oldnow) {
      this.$nextTick(() => {
        const node2 = JSON.parse(JSON.stringify(this.$store.state.mapData.mapDataList));
        this.data.length = 0;
        alert("pageフォルダ " + this.mapDataEditCount)
        //this.ketugou();
        for(let i = 0;i<node2.length;i++)//一つ目のノードを残すためにi=1にしてます。
        {
        //alert("pageフォルダにて結合pushします。"+i+"回目")
        this.data.push(node2[i])
        }
        alert("pageフォルダにて結合push終え")
        this.currentmaxid = this.data.length
        this.existCount = this.data.length;
        alert("pageフォルダにてWATCH終え")
      })
    },
    changedNodeElement(){
      this.$nextTick(() => {
        alert("nodeelement changing")
        this.newText =this.$store.state.mapData.nodeChangedList[this.changedNodeElement-1]
      })
    }
  },

  methods: {
    alertNode(nodeId) {
      const data = this.filterById(nodeId)
      alert('clicked node = ' + data.text + '\n  number is'+data.id)
      this.tgtparents = data.text
      this.tgnumber = data.id
      this.nodeMemo = data.text
      this.nodeMemoTitle = data.text
      this.nodeMemoId = data.id
      this.$store.commit("nodeTitle/setTitle",this.nodeMemoTitle)
      this.$store.commit("nodeTitle/setId",this.nodeMemoId)
    },
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
    addNewNode(event) {
      const parent = this.filterByText(this.tgtparents)
      const tagetId = parent.id
      const newtext = this.newText === '' ? 'new_el' : this.newText
      this.node1=this.data.concat()
      //画面に描画するための”data”の中身を削除する。
      this.data.length =0
      this.currentmaxid++
      this.existCount++
      this.totalCount = this.existCount + this.deleteCount;
      alert(this.totalCount +" = total\n"+this.existCount+" = exist\n"+this.deleteCount + " = delete")
      //目的ののーどIDを見つけ出し、もし初めてリンクするなら、リンクという配列を作る。
      for (let i = 0; i < this.existCount - 1; i++) {
        if (this.node1[i].id === tagetId) {
          const newel = String(this.currentmaxid)
          if (this.node1[i].next === undefined) {
            this.node1[i].next = []
          }
          this.node1[i].next.push(this.totalCount.toString())
        }
      }
      const newNode = {
        id: this.totalCount.toString(),
        text: newtext,
        next: [],
        editable: true
      }
      this.node1.push(newNode)
      this.clearText()
      this.ketugou();
    },

    clearText(event){
      this.tgtparents =""
      this.newText=""
      this.tgnumber =""
      this.nextId =""
    },
    addNext(event) {
      alert("リンク開始")
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const child = this.filterByText(this.nextId)
      alert(child.id.toString()+"が親のnextに追加されます")
      this.node1=this.data.concat()
      this.data.length =0
      for (let i = 0; i < this.node1.length; i++) //該当するID探して、nextに追加する
      {
        if (this.node1[i].id === tagetId) //該当するIDを見つけた時
        {
          alert("該当するノードの配列上の番号は  "+tagetId+"です。")
          //const newel = String(this.nextId) //newelに新しいIDの文字列を加える。既存のノードにnextを追加するときはここをいじる
          if (this.node1[i].next === undefined) {
            this.node1[i].next = []
          }
          this.node1[i].next.push(child.id.toString())
        }
      }
      this.clearText()
      this.ketugou()
    },
    editNode(event) {
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      for (let i = 0; i < this.currentmaxid; i++) //該当するID探して、nextに追加する
      {
        if (this.data[i].id === tagetId) //該当するIDを見つけた時
        {
          this.data[i].text=this.editText
        }
      }
      this.clearText()
    },
    saveNode(event) {
      database
        .ref(this.id+"/pra2/test/")
        .set(this.data);

      database
        .ref(this.id+"/pra2/deleteCount/")
        .set(this.deleteCount);
    },
    unLink(event){
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const child = this.filterByText(this.nextId)
      alert(child.id.toString()+"が親のnextから外されます")
      this.node1=this.data.concat()
      this.data.length = 0
      for (let i = 0; i < this.node1.length; i++) //該当するID探して、nextに追加する
      {
        if (this.node1[i].id === tagetId) //該当するIDを見つけた時
        {
          alert("該当するノードの配列上の番号は  "+tagetId+"です。")
          //const newel = String(this.nextId) //newelに新しいIDの文字列を加える。既存のノードにnextを追加するときはここをいじる
          if (this.node1[i].next.includes(child.id.toString())) {
            alert(this.node1[i].next.indexOf(child.id.toString()))
            this.node1[i].next.splice(this.node1[i].next.indexOf(child.id.toString()),1)
          }
        }
      }
      this.clearText()
      this.ketugou()

    },
    easydelete(event){
      alert("削除を始めます。")
      var deleteObjNo = 0
      const deleteSize = this.deleteCount + this.existCount
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      this.node1=this.data.concat()
      this.data.splice(0,this.data.length-1)
      //this.data[0].next.splice(0,this.data[0].next.length)
      alert(tagetId+"番を削除します"+'\n  deleteSize is'+deleteSize)
        for(let i =0; i < deleteSize ;i++)
        {
          //alert(i+1+"回目。")
          if (this.node1[i].id === tagetId) //該当するIDを見つけた時
          {
            alert("削除対象を見つけました。")
            if(this.node1[i].next === undefined || this.node1[i].next.length == 0){
              deleteObjNo = i;
              for(let k =0; k < this.currentmaxid;k++)
              {
                if(this.node1[k].next !== undefined &&
                this.node1[k].next.includes(i.toString()))
                {
                  alert(k+" 回目　このノードと繋がっているノードから対象を削除します。")
                  this.serchAndDeleteNext(this.node1[k].next,tagetId)
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
                this.node1.splice(deleteObjNo,1)
                //alert(deleteObjNo+" 番のノードを削除しました。node1の長さは" + this.node1.length + "です。")
              }
              alert("削除を終了します。")
              this.deleteCount++
      this.clearText()
      this.ketugou()
    },
    ketugou(event){
      this.currentmaxid = this.node1.length
      for(let i = 0;i<this.node1.length;i++)//一つ目のノードを残すためにi=1にしてます。
      {
        //alert("結合pushします。")
        this.data.push(this.node1[i])
      }
      alert("結合終えました。")
      //this.$store.commit("mapData/setMapData",this.node1)//コミットはコンポーネントの方で
      this.node1.splice(0,this.node1.length)
    },
    serchAndDeleteNext(nextList,deletId){
      alert("Next整理 nextList.length = " + nextList.length )
      for(let ii=0;ii<nextList.length;ii++){
        alert("Next整理 For開始")
         if(nextList[ii] == deletId){
          alert(nextList[ii]+"; nextList"+"  "+deletId+"; deleteId")
          nextList.splice(ii,1)
         }
      }
    },
    reTakeNo(event){
      for(let i = 0; i < this.currentmaxid;i++){
        this.node1[i].id = (i+1).toString()
      }
    }
  },
  components:{
    MermaidComponent:MermaidComponent
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
  width: 60%;
  margin: auto;
  align-items: left;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-size: 20px;
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
