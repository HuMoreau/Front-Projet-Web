<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Etats des projets</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" @click="goTo('/projets')"/>
      <InputText placeholder="Rechercher" type="text" class="ml-auto" v-model="recherche" :disabled="!projets"/>
    </div>
    <div v-if="projets" class="p-panel-content no-padding max-min-h-35vh">
      <VisuelProjet v-for="projet in this.projetsToDisplay" :key="projet.id" :projet-to-display="projet"/>
    </div>
    <div v-else class="p-panel-content no-padding border-bottom">
      <div class="flex flex-column justify-content-center align-items-center p-3">
        <label class="mb-2">Il n'y a aucun projet en cours !</label>
        <PrimeButton label="PROJETS" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right" @click="goTo('/projets/new')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelProjet from "@/components/HomePage/Displayers/Visuels/VisuelDisplayerProjet";
import {apiService} from "@/main";
export default {
  name: "ProjectsStateDisplayer",
  components: {VisuelProjet},
  data(){
    return {
      recherche : null,
      projets : null,
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
      apiService.get("projet").then(response => {
        this.projets = response.data;
      });
    },
  },
  computed : {
    projetsToDisplay : function (){
      let result = this.projets;
      if(this.recherche){
        result = result.filter(projet => projet.nom.toLowerCase().includes(this.recherche.toLowerCase())
        );
      }
      return result;
    }
  }
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