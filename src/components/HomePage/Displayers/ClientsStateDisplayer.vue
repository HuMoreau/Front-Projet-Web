<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Clients</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" @click="goTo('/clients')"/>
      <InputText placeholder="Rechercher" type="text" class="ml-auto" :disabled="!clients"/>
    </div>
    <div v-if="clients" class="p-panel-content no-padding max-min-h-35vh">
      <VisuelClient v-for="client in this.clients" :key="client.id" :client-to-display="client"/>
    </div>
    <div v-else class="p-panel-content no-padding border-bottom">
      <div class="flex flex-column justify-content-center align-items-center p-3">
        <label class="mb-2">Il n'y a aucun client en cours !</label>
        <PrimeButton label="CLIENTS" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right" @click="goTo('/clients/new')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelClient from "@/components/HomePage/Displayers/Visuels/VisuelDisplayerClient";
import {apiService} from "@/main";

export default {
  name: "ClientsStateDisplayer",
  components: {VisuelClient},
  data(){
    return {
      clients : null,
    }
  },
  mounted() {
    // api
    this.populate();
  },
  methods: {
    goTo(link, params){
      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
    populate() {
      apiService.get("client").then(response => {
        this.clients = response.data;
      });
    },
  },
}
</script>

<style scoped>

.p-panel-header{
  display: flex;
  align-items: center;
}

.p-panel-title{
  font-size: 1.5em;
  font-weight: bold;
}
</style>