<template>
  <div class="container">
    <div>
      <h1 class="titled">
        {{ title }}
      </h1>
      <div class="inputt">
        Set Parent :
        <input v-model="tgtparents" class="compwht" />
        NO:
        <input v-model="tgnumber" class="compwht" />
        <button :disabled="isButtonAble" class="compwht" @click="deleteNode">
          Delete
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
    <vue-mermaid
        :nodes="data"
        :config="mermaid"
        type="graph LR"
        @nodeClick="alertNode"
      ></vue-mermaid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tgtparents: '',
      newText: '',
      tgnumber: '',
      nextId: '',
      editText: '',
      currentmaxid: 3,
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
          next:['2'],
          editable: true
        },
        {
          id: '2',
          text: 'B',
          editable: true
        },
        {
          id: '3',
          text: 'c',
          editable: true
        }
      ]
    }
  },
  computed: {
    isexistparent(event) {
      return !this.isButtonAble ? 'OK' : 'NG'
    },
    isButtonAble(event) {
      return this.filterByParents(this.tgtparents) === null
    },
    nowNextA(event) {
      return this.data[0].next
    }
  },
  methods: {
    alertNode(nodeId) {
      const data = this.filterById(nodeId)
      alert('clicked node = ' + data.text + '  number is'+data.id)
      this.tgtparents = data.text
      this.tgnumber = data.id
    },
    filterByParents(text) {
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
      const parent = this.filterByParents(this.tgtparents)
      const tagetId = parent.id
      const newtext = this.newText === '' ? 'new_el' : this.newText
      this.currentmaxid++
      for (let i = 0; i < this.currentmaxid - 1; i++) {
        if (this.data[i].id === tagetId) {
          const newel = String(this.currentmaxid)
          if (this.data[i].next === undefined) {
            this.data[i].next = []
          }
          this.data[i].next.push(newel)
        }
      }
      const newNode = {
        id: this.currentmaxid.toString(),
        text: newtext,
        editable: true
      }
      this.data.push(newNode)
      this.clearText()
    },
    clearText(event){
      this.tgtparents =""
      this.newText=""
      this.tgnumber =""
      this.nextId =""
    },
    addNext(event) {
      const parent = this.filterByParents(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      for (let i = 0; i < this.currentmaxid; i++) //該当するID探して、nextに追加する
      {
        if (this.data[i].id === tagetId) //該当するIDを見つけた時
        {
          const newel = String(this.nextId) //newelに新しいIDの文字列を加える。既存のノードにnextを追加するときはここをいじる
          if (this.data[i].next === undefined) {
            this.data[i].next = []
          }
          this.data[i].next.push(newel)
        }
      }
      this.clearText()
    },
    editNode(event) {
      const parent = this.filterByParents(this.tgtparents) //nextに追加されるのノード
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
      const parent = this.filterByParents(this.tgtparents) //nextに追加されるのノード
      const tagetId = parent.id //nextに追加されるのノードのIDの文字列
      for (let i = 0; i < this.currentmaxid; i++) //該当するID探して、nextに追加する
      {
        if(this.data[i].next !== undefined){
          alert("このノードは他のノードと繋がっているため、削除できません。")
        }
      }
      this.clearText()
    }
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
  margin: auto;
  align-items: center;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
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

</style>
