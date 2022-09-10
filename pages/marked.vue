<template>
<div>
    <textarea class="markdown" v-model="markdown"></textarea>
    <div class="markdown" v-html="preview()"></div>
</div>
</template>

<script>
export default {
    name: "editor",
   props: [],
   data() {
     return {
       markdown: "aaa"
     };
 },
 methods: {
    preview() {
       return marked(this.markdown);
     }
  }
}
</script>

<style>
.markdown{
    width: 40%;
    height: 400;
}
</style>