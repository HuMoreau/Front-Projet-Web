<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Tickets en cours</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" />
      <DropDown v-model="selectedSorting" :options="sortingList" optionLabel="name" class="ml-auto" placeholder="Trier par" :disabled="!tickets"/>
    </div>
    <div v-if="tickets" class="p-panel-content no-padding max-min-h-35vh">
      <VisuelTicket v-for="ticket in this.tickets" :key="ticket.id" :ticket-to-display="ticket"/>
    </div>
    <div v-else class="p-panel-content no-padding border-bottom">
      <div class="flex flex-column justify-content-center align-items-center p-3">
        <label class="mb-2">Vous n'avez aucun ticket en cours !</label>
        <PrimeButton label="TICKETS" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelTicket from "@/components/HomePage/Displayers/Visuels/VisuelDisplayerTicket";
export default {
  name: "SelectedTicketDisplayer",
  components: {VisuelTicket},
  data(){
    return {
      // tickets : [
      //   {id: 1, titre : "Ticket 1", description : "Description du ticket 1", date : "01/01/2022", projet : "Projet 1", priorite : "urgent"},
      //   {id: 2, titre : "Ticket 2", description : "Description du ticket 2", date : "05/02/2022", projet : "Projet 2", priorite : "mineur"},
      //   {id: 3, titre : "Ticket 3", description : "Description du ticket 3", date : "10/03/2022", projet : "Projet 3", priorite : "important"},
      //   {id: 4, titre : "Ticket 4", description : "Description du ticket 4", date : "15/04/2022", projet : "Projet 4", priorite : "urgent"},
      //   {id: 5, titre : "Ticket 5", description : "Description du ticket 5", date : "20/05/2022", projet : "Projet 5", priorite : "mineur"}
      // ],
      tickets : null,
      selectedSorting : null,
      sortingList : [
        {name : "Priorité"},
        {name : "Ancienneté"},
        {name : "Projet"}
      ]
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