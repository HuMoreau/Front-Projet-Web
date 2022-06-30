<template>
  <div id="app">
    <HeadBar v-if="showHeadbar" id="headbar"/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar/HeadBar";
export default {
  name: 'App',
  components: {
    HeadBar
  },
  data(){
    return {
      showHeadbar : true,
    }
  }
}
</script>

<style>
body{
  margin: 0;
}

#headbar{
  top: 0;
  position: sticky;
  border-radius: 0;
  z-index : 100;
}
</style>
