<template>
  <div class="container">
    <div class="titled">
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
      <button class="compwht" @click="check">
          check
        </button>
              <button :disabled="isButtonAble" class="compwht" @click="easydelete">
          EasyDelete
        </button>
        <button class="compwht" @click="ketugou">
          結合
        </button>
    <vue-mermaid
        class = "mermaid"
        :nodes="data"
        :config="mermaid"
        type="graph TD"
        @nodeClick="alertNode"
      ></vue-mermaid>
    </div>
    <div class = "markdown">
      <Markdown :message='nodeMemoTitle' :id="nodeMemoId"></Markdown>
      <!-- <eMark></eMark> -->
    </div>
  </div>
</template>

<script>
import Markdown from './markdown.vue'
import firebase from 'firebase'
import {database} from "~/plugins/firebase.js"
export default {
  name:"Mermaid",
  data() {
    return {
      tgtparents: '',
      newText: '',
      tgnumber: '',
      nextId: '',
      editText: '',
      currentmaxid:4,
      deleteCount:0,
      existCount:4,
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
          id: '1',
          text: 'A',
          editable: true,
          next :['2','3'],
        },
        {
          id: '2',
          text: 'B',
          editable: true,
          next :[],
        },
        {
          id: '3',
          text: 'C',
          editable: true,
          next :['4'],
        },
        {
          id: '4',
          text: 'D',
          editable: true,
          next :[],
        },
      ],
      node1:[
      ]
    }
  },
  created: function() {
    database
      .ref("test/")//thisはuserにかかっている
      .once("value")
      .then(result => {
        if (result.val()) {
          this.node1 = result.val();
          this.data.splice(1,this.data.length);
          this.currentmaxid = this.node1.length
          for(let i = 1;i<this.node1.length;i++)//一つ目のノードを残すためにi=1にしてます。
          {
            //alert(i+ "回目の結合pushします。")
            this.data.push(this.node1[i])
          }
          this.node1.splice(0,this.node1.length);
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
    nowNextA(event) {
      return this.data[0].next
    },
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
    },
    filterByText(text) {
      const dataarr = this.data //export default のdata内にあるdata配列をdataarrに入れる
      for (let i = 0; i < this.currentmaxid; i++) {
        if (dataarr[i].text === text) return dataarr[i]
      }//dataarrにあるテキストと入力したテキストが一致したら、この関数は一致したオブジェクトの内容をもつ。
      return null
    },
    filterById(id) {
      const dataarr = this.data
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
      this.data.length =1
      this.currentmaxid++
      this.existCount++
      //目的ののーどIDを見つけ出し、もし初めてリンクするなら、リンクという配列を作る。
      for (let i = 0; i < this.currentmaxid - 1; i++) {
        if (this.node1[i].id === tagetId) {
          const newel = String(this.currentmaxid)
          if (this.node1[i].next === undefined) {
            this.node1[i].next = []
          }
          this.node1[i].next.push(this.existCount.toString())
        }
      }
      const newNode = {
        id: this.existCount.toString(),
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
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      const child = this.filterByText(this.nextId)
      this.node1=this.data.concat()
      this.data.length =1
      for (let i = 0; i < this.node1.length; i++) //該当するID探して、nextに追加する
      {
        if (this.node1[i].id === tagetId) //該当するIDを見つけた時
        {
          const newel = String(this.nextId) //newelに新しいIDの文字列を加える。既存のノードにnextを追加するときはここをいじる
          if (this.node1[i].next === undefined) {
            this.node1[i].next = []
          }
          this.node1[i].next.push(child.id)
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
        .ref("test/")
        .set(this.data);
    },
    check(event){
    },
    easydelete(event){
      alert("削除を始めます。")
      var deleteObjNo = 0
      const deleteSize = this.deleteCount + this.existCount
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      this.node1=this.data.concat()
      this.data.splice(1,this.data.length-1)
      //this.data[0].next.splice(0,this.data[0].next.length)
      alert(tagetId+"番を削除します"+'\n  deleteSize is'+deleteSize)
        for(let i =0; i < this.currentmaxid ;i++)
        {
          alert(i+1+"回目。")
          if (this.node1[i].id === tagetId) //該当するIDを見つけた時
          {
            alert("削除対象を見つけました。")
            if(this.node1[i].next === undefined || this.node1[i].next.length == 0){
              deleteObjNo = i
            }
            else{
              alert("このノードは他のノードと繋がっているため、削除できません。")
            }
          }
        }
        for(let k =0; k < this.currentmaxid;k++)
        {
          if(this.node1[k].next !== undefined &&
           this.node1[k].next.length > 0)
          {
            alert(k+" 回目　このノードと繋がっているノードから対象を削除します。")
            this.serchAndDeleteNext(this.node1[k].next,tagetId)
          }
        }
        if(deleteObjNo != 0){
          alert(deleteObjNo+" 番のノードを削除します。")
          this.node1.splice(deleteObjNo,1)
          alert(deleteObjNo+" 番のノードを削除しました。node1の長さは" + this.node1.length + "です。")
        }
      this.deleteCount++
      this.clearText()
      this.ketugou()
    },
    ketugou(event){
      alert("currentmaxidを再採番し、結合します")
      this.currentmaxid = this.node1.length
      for(let i = 1;i<this.node1.length;i++)//一つ目のノードを残すためにi=1にしてます。
      {
        alert("結合pushします。")
        this.data.push(this.node1[i])
      }
      alert("結合終えました。")
      console.log(this.data[0].text)
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
    Markdown:Markdown,
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

</style>
