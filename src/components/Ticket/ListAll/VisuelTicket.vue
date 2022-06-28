<template>
  <div class="line-in-list flex-column">
    <div class="flex align-items-center">
      <label class="mr-3"><strong>{{this.ticketToDisplay.nom}}</strong></label>
      <span class="importance-badge">{{this.ticketToDisplay.etatAvancement}}</span>
      <span class="importance-badge">{{this.ticketToDisplay.importance}}</span>
      <label class="ml-2 mr-3">RAP : {{this.ticketToDisplay.idRapporteur ? this.ticketToDisplay.idRapporteur : '-'}} </label>
      <label class="mr-3">DEV : {{this.ticketToDisplay.idDev ? this.ticketToDisplay.idDev : '-'}} </label>
      <label class="mr-3">CLIENT : {{this.ticketToDisplay.idClient ? this.ticketToDisplay.idClient : '-'}} </label>
      <label class="mr-3">PROJET : {{this.ticketToDisplay.idProjet}} </label>
      <label class="mr-3">CREATION : {{this.ticketToDisplay.dateStart}} </label>
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
      this.$emit('deleteMe', this.userToDisplay);
    }
  },
  computed: {}
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