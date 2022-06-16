<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Etats des projets</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" />
      <InputText placeholder="Rechercher" type="text" class="ml-auto" :disabled="!projets"/>
    </div>
    <div v-if="projets" class="p-panel-content no-padding max-min-h-35vh">
      <VisuelProjet v-for="projet in this.projets" :key="projet.id" :projet-to-display="projet"/>
    </div>
    <div v-else class="p-panel-content no-padding border-bottom">
      <div class="flex flex-column justify-content-center align-items-center p-3">
        <label class="mb-2">Il n'y a aucun projet en cours !</label>
        <PrimeButton label="PROJETS" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelProjet from "@/components/HomePage/Displayers/Visuels/VisuelProjet";
export default {
  name: "ProjectsStateDisplayer",
  components: {VisuelProjet},
  data(){
    return {
      // projets : [
      //   {id: 1, nom : "Projet 1", date : "01/01/2022", nombreTicketsUrgents : 2, nombreTicketsImportants : 5, nombreTicketsMineurs : 13},
      //   {id: 2, nom : "Projet 2", date : "05/02/2022", nombreTicketsUrgents : 5, nombreTicketsImportants : 12, nombreTicketsMineurs : 43},
      //   {id: 3, nom : "Projet 3", date : "10/03/2022", nombreTicketsUrgents : 0, nombreTicketsImportants : 2, nombreTicketsMineurs : 5},
      //   {id: 4, nom : "Projet 4", date : "15/04/2022", nombreTicketsUrgents : 18, nombreTicketsImportants : 4, nombreTicketsMineurs : 2},
      //   {id: 5, nom : "Projet 5", date : "20/05/2022", nombreTicketsUrgents : 1, nombreTicketsImportants : 6, nombreTicketsMineurs : 3},
      // ],
      projets : null,
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