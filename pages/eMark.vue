<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">    
    <button @click="changeEditorOn">edit</button>
    <m-editor
      v-if="editorOn"
      v-model="text"
      lang="en"
      @on-change="handleChange"
    />
    <div class="m-editor-preview" 
        v-if="!editorOn"
        v-html="markdownContent"></div>
  </div> 
</template>

<script>

export default {  
  data() {
    return {
      text: '',
      markdownContent: '',
      editorOn:true
    };
  },
  methods: {
    handleChange(data) {
      this.markdownContent = data.htmlContent
    },
    changeEditorOn(){
    return this.editorOn = !this.editorOn
    },
  }
};
</script>