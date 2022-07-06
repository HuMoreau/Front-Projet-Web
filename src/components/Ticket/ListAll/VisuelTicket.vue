<template>
  <div class="line-in-list flex-column">
    <div class="flex align-items-center">
      <label class="p-panel-title mr-3"><strong>{{this.ticketToDisplay.nom}}</strong></label>
      <div class="flex flex-column align-items-center ml-2 mr-3">
        <label class="mb-1"><strong>Avancement</strong></label>
        <span :class="'importance-badge ' + classBadge">
          {{temporaryState.name ? temporaryState.name : this.avancement}}</span>
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
        <label>{{temporaryDevName? temporaryDevName : abreviationNomDev}}</label>
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
        <label>{{dateStartFormated}}</label>
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
        <PrimeButton v-if="this.isUserDev && this.avancement === 'A faire' && !this.temporaryAssigned" icon="pi pi-bookmark"
                     class="p-button-rounded p-button-text" @click="assignItToMe"/>
        <PrimeButton v-else-if="this.displayFinishButton && !temporaryFinished" icon="pi pi-check-circle"
                     class="p-button-rounded p-button-success p-button-text" @click="finishItForMe"/>
        <PrimeButton v-else-if="this.isUserDev" icon="pi pi-ban" disabled
                     class="p-button-rounded p-button-text"/>
        <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text"
                     @click="goTo(`/tickets/${ticketToDisplay.id}`)"/>
      </div>
    </div>
    <div v-if="displayDescription || localyDisplayDescription" class="m-2 p-1">
      <small>{{this.ticketToDisplay.description}}</small>
    </div>
    <PrimeToast/>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {apiService} from "@/main";

export default {
  name: "VisuelTicket",
  props : {
    ticketToDisplay : Object,
    displayDescription : Boolean,
  },
  setup(){
    const authStore = useAuthStore();
    const {userId, userNom, userPrenom} = storeToRefs(authStore);
    const {isUserDev} = authStore
    return{
      authStore,
      userNom,
      userPrenom,
      userId,
      isUserDev,
    }
  },
  data() {
    return {
      temporaryAssigned : false,
      temporaryFinished : false,
      temporaryDevName : null,
      temporaryState : {value: null, name: null},
      temporaryAssignDate : null,
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
    },
    assignItToMe(){
      let body = {
        id: this.ticketToDisplay.id,
        idProjet: this.ticketToDisplay.projet.id,
        idClient: this.ticketToDisplay.client.id,
        idRapporteur: this.ticketToDisplay.rapporteur.id,
        idDev: this.userId,
        nom: this.ticketToDisplay.nom,
        dateStart: this.dateComputed(this.ticketToDisplay.dateStart),
        dateAssign: this.dateComputed(new Date()),
        dateEnd: null,
        etatAvancement: 'EN_COURS',
        importance: this.ticketToDisplay.importance,
        description: this.ticketToDisplay.description,
      };

      // sending request
      apiService.put('ticket', body).then(() => {
        this.temporaryState = {value : "EN_COURS", name : "En cours"};
        this.temporaryDevName = this.abregerNomPrenom(this.userPrenom, this.userNom);
        this.temporaryAssignDate = new Date();
        this.temporaryAssigned = true;
        this.$emit('assignMe', true);
      }).catch( (error) => {
        console.log("Error", error);
        this.$emit('assignMe', false);
      });
    },
    finishItForMe(){
      let body = {
        id: this.ticketToDisplay.id,
        idProjet: this.ticketToDisplay.projet.id,
        idClient: this.ticketToDisplay.client.id,
        idRapporteur: this.ticketToDisplay.rapporteur.id,
        idDev: this.temporaryAssigned ? this.userId : this.ticketToDisplay.developpeur.id,
        nom: this.ticketToDisplay.nom,
        dateStart: this.dateComputed(this.ticketToDisplay.dateStart),
        dateAssign: this.temporaryAssigned ? this.dateComputed(this.temporaryAssignDate) : this.dateComputed(this.ticketToDisplay.dateAssign),
        dateEnd: this.dateComputed(new Date()),
        etatAvancement: 'FINI',
        importance: this.ticketToDisplay.importance,
        description: this.ticketToDisplay.description,
      };

      // sending request
      apiService.put('ticket', body).then(() => {
        this.temporaryState = {value : "FINI", name : "Fini"};
        this.temporaryFinished = true;
        this.$emit('finishMe', true);
        this.authStore.refreshNoisette();
      }).catch( (error) => {
        console.log("Error", error);
        this.$emit('finishMe', false);
      });
    },
    dateComputed(givenDate) {
      let date = new Date(givenDate);
      return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    },
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
    classBadge : function(){
      return this.temporaryState.value ? this.temporaryState.value : this.ticketToDisplay.etatAvancement;
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
    dateStartFormated : function(){
      return this.ticketToDisplay.dateStart ? new Date(this.ticketToDisplay.dateStart).toLocaleDateString('fr') : '-';
    },
    displayFinishButton : function(){
      return (this.isUserDev && (this.avancement == 'En cours' || this.temporaryState.name == 'En cours')
          && (this.ticketToDisplay.developpeur.id == this.userId || this.temporaryDevName));
    }
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