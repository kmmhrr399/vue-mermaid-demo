<template>
    <div class="markdown-editor">
      <button @click="changeEditorOn">edit</button>
      <div v-if="editorOn">
        <h3>{{id}}</h3>
      <mavon-editor
        :toolbars="markdownOption"
        language="en"
        v-model="model"
      />
      </div>
  </div>
</template>
<script>
export default 
{
    props:
    {
      message:{
        type: String,
      },
      id:{
        type: String,
      }
    },
    // {
    //   // model: {
    //   //   type: Object | null,
    //   //   default: null,
    //   //},
    // },
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
        editorOn:false,
        model:"",
      };
    },
    computed:{
      convert(){
        //this.model = this.
      }
    },
    methods: {
          changeEditorOn(){
            return this.editorOn = !this.editorOn
          }
        },
  };
</script>

<style>
.markdown-editor {
    width: 100%;
    height: 100%;
  }
</style>
