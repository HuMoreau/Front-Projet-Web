<template>
  <div class="line-in-list flex-column">
    <div class="flex align-items-center">
      <label class="p-panel-title mr-3"><strong>{{this.ticketToDisplay.nom}}</strong></label>
      <div class="flex flex-column align-items-center ml-2 mr-3">
        <label class="mb-1"><strong>Avancement</strong></label>
        <span :class="'importance-badge ' + this.ticketToDisplay.etatAvancement">{{this.avancement}}</span>
      </div>
      <div class="flex flex-column align-items-center ml-2 mr-3">
        <label class="mb-1"><strong>Priorité</strong></label>
        <span :class="'importance-badge ' + this.priorite.toLowerCase()">{{this.priorite}}</span>
      </div>
      <div class="flex flex-column align-items-center ml-2 mr-3">
        <label class="mb-1"><strong>Rapporteur</strong></label>
        <label>{{abreviationNomRap}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label class="mb-1"><strong>Developpeur</strong></label>
        <label>{{abreviationNomDev}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label class="mb-1"><strong>Client</strong></label>
        <label>{{abreviationNomClient}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label class="mb-1"><strong>Projet</strong></label>
        <label>{{this.ticketToDisplay.projet.nom}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label class="mb-1"><strong>Date création</strong></label>
        <label>{{this.ticketToDisplay.dateStart}}</label>
      </div>
      <div id="go_to_buttons">
        <PrimeButton :icon="localyDisplayDescription ? 'pi pi-minus-circle' : 'pi pi-info-circle'"
                     class="p-button-rounded p-button-secondary p-button-text"
                     :disabled="this.displayDescription"
                     @click="showOrHideDescription()"/>
        <PrimeButton icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-button-sm p-button-text"
                     @click="goTo(`/tickets/${ticketToDisplay.id}`, {mod : true})"/>
        <PrimeButton icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm p-button-text"
                     @click="deleteMe"/>
        <PrimeButton icon="pi pi-bookmark"
                     class="p-button-rounded p-button-text"/>
        <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text"
                     @click="goTo(`/tickets/${ticketToDisplay.id}`)"/>
      </div>
    </div>
    <div v-if="displayDescription || localyDisplayDescription" class="m-2 p-1">
      <small>{{this.ticketToDisplay.description}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelTicket",
  props : {
    ticketToDisplay : Object,
    displayDescription : Boolean,
  },
  data() {
    return {
      localyDisplayDescription : false,
    }
  },
  methods: {
    goTo(link, params){

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
    deleteMe(){
      this.$emit('deleteMe', this.ticketToDisplay);
    },
    abregerNomPrenom(prenom, nom){
      return Array.from(prenom)[0]+'. '+ nom;
    },
    showOrHideDescription() {
      this.localyDisplayDescription = !this.localyDisplayDescription;
    }
  },
  computed: {
    avancement : function (){
      if(this.ticketToDisplay.etatAvancement === "EN_COURS"){
        return 'En cours';
      }
      if(this.ticketToDisplay.etatAvancement === "A_FAIRE"){
        return 'A faire';
      }
      if(this.ticketToDisplay.etatAvancement === "FINI"){
        return 'Fini';
      }
      return '-';
    },
    priorite : function (){
      if(this.ticketToDisplay.importance === "MINEUR"){
        return 'Mineur';
      }
      if(this.ticketToDisplay.importance === "IMPORTANT"){
        return 'Important';
      }
      if(this.ticketToDisplay.importance === "URGENT"){
        return 'Urgent';
      }
      return '-';
    },
    abreviationNomDev : function (){
      if(this.ticketToDisplay.developpeur.prenom && this.ticketToDisplay.developpeur.nom){
        return this.abregerNomPrenom(this.ticketToDisplay.developpeur.prenom, this.ticketToDisplay.developpeur.nom);
      }
      return '-';
    },
    abreviationNomRap : function (){
      if(this.ticketToDisplay.rapporteur.prenom && this.ticketToDisplay.rapporteur.nom){
        return this.abregerNomPrenom(this.ticketToDisplay.rapporteur.prenom, this.ticketToDisplay.rapporteur.nom);
      }
      return '-';
    },
    abreviationNomClient : function (){
      if(this.ticketToDisplay.client.prenom && this.ticketToDisplay.client.nom){
        return this.abregerNomPrenom(this.ticketToDisplay.client.prenom, this.ticketToDisplay.client.nom);
      }
      return '-';
    },
  },
  watch: {
    displayDescription(value){
      if(value === false){
        this.localyDisplayDescription = false;
      }
    }
  }
}
</script>

<style scoped>
.utilisateur{
  border-bottom: 1px solid #dee2e6;
  padding: 10px
}
#go_to_buttons{
  margin-left: auto;
}
</style>