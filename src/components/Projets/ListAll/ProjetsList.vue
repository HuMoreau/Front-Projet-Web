<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Projets</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
                     @click="goTo('/projets/new')"/>
        <div class="utility-buttons flex align-items-center">
          <DropDown class="mr-2" v-model="trierPar" :options="tris" optionLabel="value" :showClear="true" placeholder="Trier par">
            <template #value="options">
              <div v-if="options.value">
                <div>{{options.value.name}}
                  <i :class="options.value.icon"></i></div>
              </div>
              <div v-else>
                {{options.placeholder}}
              </div>
            </template>
            <template #option="options">
              <div>
                <div>{{options.option.name}}
                  <i :class="options.option.icon"></i></div>
              </div>
            </template>
          </DropDown>
          <InputText placeholder="Rechercher" type="text" class="ml-auto" v-model="recherche" :disabled="!projets"/>
        </div>
      </div>
      <div v-if="projets" class="p-panel-content no-padding max-min-h-90vh">
        <VisuelProjet v-for="projet in this.projetsToDisplay" :key="projet.id"
                      :projet-to-display="projet" @deleteMe="deleteProjet($event)"/>
      </div>
      <div v-else class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Il n'y a aucun projet.</label>
          <PrimeButton label="CRÉER PROJET" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
        </div>
      </div>
    </div>

    <!--  Modal de suppression  -->
    <ProjetDeleteModal @closeMe="closeDeleteModal" :displayed="isDeletionModalDisplayed" :projet-to-display="projetToDelete"/>
  </div>
</template>

<script>
import VisuelProjet from "@/components/Projets/ListAll/VisuelProjet";
import ProjetDeleteModal from "@/components/Projets/DeleteOne/ProjetDeleteModal";
export default {
  name: "ProjetsList",
  components: {ProjetDeleteModal, VisuelProjet},
  data() {
    return {
      recherche : null,
      isDeletionModalDisplayed : false,
      projetToDelete : null,
      trierPar : null,
      tris : [
        {value : "nbTicketsCroissants", name : "Nombre de ticket", icon : "pi pi-sort-numeric-down"},
        {value : "nbTicketsDecroissants", name : "Nombre de tickets", icon : "pi pi-sort-numeric-up"}
      ],
      projets : [
        {id: 1, nom:'GSM Tracker', nombreTicketsUrgents : 5, nombreTicketsImportants : 3, nombreTicketsMineurs : 12},
        {id: 2, nom:'Disquette 2000', nombreTicketsUrgents : 2, nombreTicketsImportants : 8, nombreTicketsMineurs : 4},
        {id: 3, nom:'Megabit Ultra', nombreTicketsUrgents : 3, nombreTicketsImportants : 5, nombreTicketsMineurs : 5},
        {id: 4, nom:'Firewall Shadow Hacker', nombreTicketsUrgents : 0, nombreTicketsImportants : 2, nombreTicketsMineurs : 1},
        {id: 5, nom:'HDD Booster', nombreTicketsUrgents : 6, nombreTicketsImportants : 14, nombreTicketsMineurs : 21},
      ]
    }
  },
  methods: {
    deleteProjet(event){
      this.projetToDelete = event;
      this.isDeletionModalDisplayed = true;
    },
    closeDeleteModal(){
      this.projetToDelete = null;
      this.isDeletionModalDisplayed = false;
    },
    goTo(link, params){

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    }
  },
  computed: {
    projetsToDisplay : function (){
      let result = this.projets;
      if(this.recherche){
        result = result.filter(projet => projet.nom.toLowerCase().includes(this.recherche.toLowerCase()));
      }
      if(this.trierPar){
        if(this.trierPar.value === 'nbTicketsDecroissants'){
          result = result.sort((projet1, projet2) =>
              (projet1.nombreTicketsUrgents + projet1.nombreTicketsImportants + projet1.nombreTicketsMineurs)
              - (projet2.nombreTicketsUrgents + projet2.nombreTicketsImportants + projet2.nombreTicketsMineurs)
          );
        }
        else if(this.trierPar.value === 'nbTicketsCroissants'){
          result = result.sort((projet1, projet2) =>
              (projet2.nombreTicketsUrgents + projet2.nombreTicketsImportants + projet2.nombreTicketsMineurs)
              - (projet1.nombreTicketsUrgents + projet1.nombreTicketsImportants + projet1.nombreTicketsMineurs)
          );
        }
      }
      return result;
    }
  }
}
</script>

<style scoped>
.utility-buttons{
  margin-left: auto;
}
</style>