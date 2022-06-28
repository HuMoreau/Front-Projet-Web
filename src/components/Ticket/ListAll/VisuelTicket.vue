<template>
  <div class="line-in-list flex-column">
    <div class="flex align-items-center">
      <label class="p-panel-title mr-3"><strong>{{this.ticketToDisplay.nom}}</strong></label>
      <span :class="'importance-badge ' + this.ticketToDisplay.etatAvancement + ' mr-2'">{{this.avancement}}</span>
      <span :class="'importance-badge ' + this.priorite.toLowerCase() + ' mr-2'">{{this.priorite}}</span>
      <div class="flex flex-column align-items-center ml-2 mr-3">
        <label><strong>Rapporteur</strong></label>
        <label>{{this.ticketToDisplay.rapporteur.nom
            ? this.ticketToDisplay.rapporteur.prenom + ' ' + this.ticketToDisplay.rapporteur.nom : '-'}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label><strong>Developpeur</strong></label>
        <label>{{this.ticketToDisplay.developpeur.nom
            ? this.ticketToDisplay.developpeur.prenom + ' ' + this.ticketToDisplay.developpeur.nom : '-'}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label><strong>Client</strong></label>
        <label>{{this.ticketToDisplay.client.nom
              ? this.ticketToDisplay.client.prenom + ' ' + this.ticketToDisplay.client.nom : '-'}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label><strong>Projet</strong></label>
        <label>{{this.ticketToDisplay.projet.nom}}</label>
      </div>
      <div class="flex flex-column align-items-center mr-3">
        <label><strong>Date création</strong></label>
        <label>{{this.ticketToDisplay.dateStart}}</label>
      </div>
      <div id="go_to_buttons">
        <PrimeButton icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-button-sm p-button-text"
                     @click="goTo(`/tickets/${ticketToDisplay.id}`, {mod : true})"/>
        <PrimeButton icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm p-button-text"
                     @click="deleteMe"/>
        <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text"
                     @click="goTo(`/tickets/${ticketToDisplay.id}`)"/>
      </div>
    </div>
    <div v-if="displayDescription" class="m-2 p-1">
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
  methods: {
    goTo(link, params){
      let result = "http://localhost:8080" + link;
      if(params){
        result += "?";
        Object.entries(params).forEach(param => {
          result += param[0];
          result += "=";
          result += param[1];
          result += "&"
        });
        result.slice(0, -1);
      }
      window.location.href = result;
    },
    deleteMe(){
      this.$emit('deleteMe', this.ticketToDisplay);
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
      if(this.ticketToDisplay.importance === "LOW"){
        return 'Mineur';
      }
      if(this.ticketToDisplay.importance === "MEDIUM"){
        return 'Important';
      }
      if(this.ticketToDisplay.importance === "HIGH"){
        return 'Urgent';
      }
      return '-';
    },
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