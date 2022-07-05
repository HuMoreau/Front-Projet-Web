<template>
  <div class="p-component p-panel">
    <div class="p-panel-header quote-container flex flex-column">
      <div class="mb-2 bonjour fadein">Bonjour <strong class="fadein2">{{this.userPrenom}} {{this.userNom}}</strong></div>
      <div class="fadein3"><i>{{this.quote}}</i></div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

import {quoteService} from "@/main";

export default {
  name: "HelloDisplayer",
  setup() {
    const authStore = useAuthStore();
    const {userNom, userPrenom} = storeToRefs(authStore);
    return{
      userNom,
      userPrenom,
    }
  },
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
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.quote-container{
  border-radius: 6px;
  text-align: center;
}

.bonjour{
  font-size: 1.5rem;
}

.fadein{
  animation: fadeIn 2s;
}

.fadein2{
  animation: fadeIn 4s;
}

.fadein3{
  animation: fadeIn 6s;
}
</style>