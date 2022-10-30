<template>
  <div class="container">
    <div class="titled">
      <div class="inputt">
        select node {{selectedNode}}
        <button :disabled="isButtonAble" class="compwht" @click="deleteNode">
          Add
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="deleteNode">
          Delete
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="deleteNode">
          Edit
        </button>
        <button :disabled="isButtonAble" class="compwht" @click="deleteNode">
          Link
        </button>
        <input v-model="tgnumber" class="compwht" />
        <button :disabled="isButtonAble" class="compwht" @click="deleteNode">
          {{execName}}
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
export default {
  data() {
    return {
      selectedNode : '',
      execName : '',
      editText: '',
      currentmaxid:1,
      deleteCount:1,
      existCount:3,
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
          editable: true
        },
      ],
      node1:[
      ]

    }
  },
  computed: {
    // countid(event){
    //   return this.deleteCount + this.existCount
    // },
    // isButtonAble(event) {
    //   return this.filterByText(this.tgtparents) === null
    // },
    // nowNextA(event) {
    //   return this.data[0].next
    // }
  },
  methods: {

    alertNode(nodeId) {
      const data = this.filterById(nodeId)
      alert('clicked node = ' + data.text + '\n  number is'+data.id)
      this.selectedNode = data.text
      this.nodeMemo = data.text
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
        if (dataarr[i].id === id) return dataarr[i]
      }
      return null
    },
    addNewNode(event) {
      const parent = this.filterByText(this.tgtparents)
      const tagetId = parent.id
      const newtext = this.newText === '' ? 'new_el' : this.newText
      this.node1=this.data.concat()
      this.data.length =1
      this.currentmaxid++
      for (let i = 0; i < this.currentmaxid - 1; i++) {
        if (this.node1[i].id === tagetId) {
          const newel = String(this.currentmaxid)
          if (this.node1[i].next === undefined) {
            this.node1[i].next = []
          }
          this.node1[i].next.push(newel)
        }
      }
      const newNode = {
        id: this.currentmaxid.toString(),
        text: newtext,
        editable: true
      }
      this.node1.push(newNode)
      this.clearText()
      this.ketugou();
      this.node1.length =0
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
      for (let i = 0; i < this.currentmaxid; i++) //該当するID探して、nextに追加する
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
      this.node1.length =0
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
    deleteNode(event) {
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列

        for(let i =0; i < this.currentmaxid;i++)
        {
          if (this.data[i].id === tagetId) //該当するIDを見つけた時
          {
            if(this.data[i].next === undefined){
              alert("このノードを削除します。")
            }
            else{
              alert("このノードは他のノードと繋がっているため、削除できません。")
            }
          }
        }
        this.clearText()
    },
    check(event){
      const parent = this.filterByText(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      if(parent.next !== undefined)
      {
        alert("このノードは他のノードと繋がっているため、削除できません。")
      }
      else{
        alert("このノードを削除します。")
      }
    },
    easydelete(event){
      this.data.slice(1,1)
      //this.data[0].next[0] = '3'
      alert("最後の項目を削除しました")
      this.currentmaxid--
    },
    ketugou(event){
      alert("結合します")
      for(let i = 1;i<this.node1.length;i++)//一つ目のノードを残すためにi=1にしてます。
      {
        this.data.push(this.node1[i])
      }
    }
  },
  components:{
    markdown:markdown,
    //editor:editor,
    eMark:eMark,
    login:login
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
