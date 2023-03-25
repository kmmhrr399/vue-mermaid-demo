<template>
    <div class="markdown-editor">
      <button class = "detailButton" @click="changeEditorOn">detail</button>
      <div v-if="editorOn">
        <h3>{{message}}</h3>
      <mavon-editor
        :toolbars="markdownOption"
        language="en"
        v-model="model"
        @save = "save"
        defaultOpen="preview"
        :subfield="false"
      />
      </div>
  </div>
</template>
<script>
import {database} from "~/plugins/firebase.js"
export default 
{
    props:
    {
      message:{
        type: String,
        default:"no title"
      },
      id:{
        type: String,
      },
      userId3:{
        type: String,
      },
    },
    name:"Markdown",
    data() {
      return {
        markdownOption: {
          bold: true,
    italic: true,
    header: true,
    underline: true,
    strikethrough: true,
    mark: true,
    superscript: true,
    subscript: true,
    quote: true,
    ol: true,
    ul: true,
    link: true,
    imagelink: true,
    code: true,
    table: true,
    fullscreen: true,
    //readmodel: true,
    htmlcode: true,
    help: true,
    undo: true,
    redo: true,
    trash: true,
    save: true,
    navigation: true,
    alignleft: true,
    aligncenter: true,
    alignright: true,
    subfield: true,
    preview: true
        },
        editorOn:true,
        model:"",
        memosList:[],
        uId:"",
        showingMapName:"",
        mapId :'',
      };
    },
    created: function() {
    //pageでユーザー情報を保持するため
    this.getData()
    },
    computed:{
      vioo(event){
      return this.$store.getters['nodeTitle/getTitleListLen']
    },
    userInfo(){
      return this.$store.getters['userInfo/getUserId']
    },
    mapNames(){
      return this.$store.getters['mapData/getmapNameListLen']
    },
    },
    watch: {
    vioo (oldNum,newNum) {
      alert("old; "+ oldNum + "  new; "+newNum + " markdown")
      this.$nextTick(() => {
        // if(this.vioo == 1){
        //   alert("getData")
        //   this.getData();
        // }
        //alert("getData後")
        //これは動いた。
        const data = this.filterByMemoId(this.$store.state.nodeTitle.idList[this.vioo-1])
        if(data != null){
          this.model = data.model
          alert(this.model)
        }
        else{
          alert("this.filterByMemoId(number)が作動してません。\nもしくは詳細メモがありません")
        }
      })
    },
    userInfo(){
    this.$nextTick(() => {
        this.getData()
    })
  },
  mapNames(newNum,oldNum){
    this.$nextTick(() => {
      this.showingMapName = this.$store.state.mapData.mapNameList[oldNum];
      this.mapId = this.$store.state.mapData.mapIdList[oldNum]
    })
  },
    },
    methods: {
      getData(){
        this.uId = this.$store.state.userInfo.userId;
        //DBからユーザーID内にあるマップ名が等しいものを持ってくる。
        database
        .ref("map/"+this.uId+ "/map/"+ this.mapId +"/memos/")//thisはuserにかかっている
        .once("value")
        .then(result => {
          if (result.val()) {
              this.memosList = result.val();
              console.log(this.memosList)
              }
            });
          },
      changeEditorOn(){
        return this.editorOn = !this.editorOn
      },
      save(){
        const data =JSON.parse(JSON.stringify(this.memosList.concat()))
        const memoId = this.$store.state.nodeTitle.idList[this.vioo-1]
        //memoListに保存したいIDがあれば挿入する。なければ、入れ替える。
        for(let i = 0; i < data.length;i++){
          if(data[i].id == memoId){
            data[i].model = this.model
          }
          else{
            const memoProps = {
              id:memoId,
              model:this.model
            }
            this.memosList.push(memoProps)
            }
        }
        //データの登録時IDを見て保存するIDと同一のものがあった場合それを変更する。
        database
        .ref("map/"+this.userId3 + "/map/"+ this.mapId +"/memos/")
        .set(data);
      },
      filterByMemoId(memoId) {
      const dataarr =JSON.parse(JSON.stringify(this.memosList.concat()));
      console.log(this.memosList)
      for (let i = 0; i < this.memosList.length; i++) {
        //watch vioo でdataが呼び出されるたびにこの処理がかかるためalertはコメントアウト
        //alert("フィルタかかりました")
        if (dataarr[i].id == memoId) return dataarr[i]
      }
      return null
    },
        },
  };
</script>

<style>
.markdown-editor {
    width: flex;
    height: flex ;
  }

.detailButton{
  top: 0pt;
}
</style>
