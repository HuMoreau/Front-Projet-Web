<template>
  <div id="app">
    <HeadBar v-if="isAuth" id="headbar"/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar/HeadBar";
import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia";

export default {
  name: 'App',
  components: {
    HeadBar
  },
  setup() {
    const authStore = useAuthStore();
    const { isAuth } = storeToRefs(authStore);
    return{
      isAuth
    }
  },
  data(){
    return {
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
