<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label>BONJOUR</label>
    </div>
  </div>
</template>

<script>
import {quoteService} from "@/main";

export default {
  name: "HelloDisplayer",
  data(){
    return {
      quote : ""
    }
  },
  mounted() {
    // api
    this.populate();
  },
  methods: {
    populate(){
      quoteService.post().then(response => {
        this.quote = response.data.quote + " - " + response.data.author;
      });
    }
  }
}
</script>

<style scoped>

</style>