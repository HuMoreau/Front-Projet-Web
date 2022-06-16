<template>
  <div class="ticket flex" >
    <div class="flex flex-column justify-content-center">
      <div class="mb-2">
        <label id="nomTicket">{{this.ticketToDisplay.titre}}</label>
        <label> - </label>
        <small id="dateTicket">{{this.ticketToDisplay.date}}</small>
        <label> - </label>
        <small id="projetTicket">{{this.ticketToDisplay.projet}}</small>
        <label> - </label>
        <small id="prioriteTicket" :class="'importance-badge ' + this.ticketToDisplay.priorite">{{this.ticketToDisplay.priorite}}</small>
      </div>
      <small id="descriptionTicket">{{this.ticketToDisplay.description}}</small>
    </div>
    <div id="go_to_button">
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelTicket",
  props: {
    ticketToDisplay: Object
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