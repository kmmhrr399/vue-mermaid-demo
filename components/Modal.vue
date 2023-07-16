<template>
  <modal name="modal-test" :draggable="true" :resizable="true" width="85%" height="70%">
    <!-- <h1>{{ message }}</h1> -->
    <MermaidModalComponent :tgtparents='tgtparents' :tgnumber='tgnumber' :data='data'/>
  </modal>
</template>


<script>
import MermaidModalComponent from '~/components/mermaidModalpalecompo.vue'
export default {
  props: {
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
    components:{
    MermaidModalComponent,
  }
}
</script>