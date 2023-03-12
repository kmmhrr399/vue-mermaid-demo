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
      }
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
          quote: true,
          ol: true,
          ul: true,
          link: true,
          imagelink: true,
          code: true,
          table: true,
          fullscreen: true,
          htmlcode: true,
          save: true,
          subfield: true,
          preview: true
        },
        editorOn:true,
        model:"aa",
      };
    },
    methods:{
      
    },
    computed:{
      convert(){
        //this.model = this.
      }
    },
    methods: {
          changeEditorOn(){
            return this.editorOn = !this.editorOn
          },
          save(){
            database
            .ref("map/"+this.id+"/tizu/memos/")
            .set(this.model);
      }
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
