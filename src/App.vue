<template>
  <div id="app">
    <HeadBar id="headbar"/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar/HeadBar";
export default {
  name: 'App',
  components: {
    HeadBar
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
