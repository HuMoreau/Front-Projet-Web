<template>
  <div class="ticket flex" >
    <div class="flex flex-column justify-content-center">
      <div class="mb-2">
        <label id="nomTicket">{{this.ticketToDisplay.nom}}</label>
        <label> - </label>
        <small id="dateTicket">{{this.ticketToDisplay.dateStart}}</small>
        <label> - </label>
        <small id="projetTicket">{{this.ticketToDisplay.projet.nom}}</small>
        <label> - </label>
        <small id="prioriteTicket" :class="'importance-badge ' + this.ticketToDisplay.importance.toLowerCase()">{{this.ticketToDisplay.importance}}</small>
      </div>
      <small id="descriptionTicket">{{this.ticketToDisplay.description}}</small>
    </div>
    <div id="go_to_button">
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text" @click="goTo(`/tickets/${ticketToDisplay.id}`, {mod : true})"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelDisplayerTicket",
  props: {
    ticketToDisplay: Object
  },
  methods: {
    goTo(link, params){
      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    }
  }
}
</script>

<style scoped>

.ticket{
  border-bottom: 1px solid #dee2e6;
  padding: 10px
}

#nomTicket{
  font-weight: bold;
}

#go_to_button{
  margin-left: auto;
}
</style>