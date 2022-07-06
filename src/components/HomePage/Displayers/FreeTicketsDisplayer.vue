<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Tickets libres</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" @click="goTo('/tickets')"/>
      <DropDown v-model="selectedSorting" :options="sortingList" class="ml-auto" placeholder="Trier par" :disabled="!tickets"/>
    </div>
    <div v-if="tickets && tickets.length > 0" class="p-panel-content no-padding max-min-h-35vh">
      <VisuelTicket v-for="ticket in this.sortedTickets" :key="ticket.id" :ticket-to-display="ticket"/>
    </div>
    <div v-else class="p-panel-content no-padding border-bottom">
      <div class="flex flex-column justify-content-center align-items-center p-3">
        <label class="mb-2">Il n'y a plus aucun ticket disponible</label>
        <PrimeButton label="CREER UN TICKET" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right" @click="goTo('/tickets/new')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelTicket from "@/components/HomePage/Displayers/Visuels/VisuelDisplayerTicket";
import {apiService} from "@/main";
export default {
  name: "FreeTicketsDisplayer",
  components: {VisuelTicket},
  data(){
    return {
      tickets : null,
      selectedSorting : null,
      sortingList : ["Priorité", "Ancienneté", "Projet"]
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

      apiService.get("ticket").then(response => {
        this.tickets = [];
        for(let i = 0; i < response.data.length; i++) {
          let ticket = response.data[i];
          if (!ticket.developpeur.id) {
            this.tickets.push(ticket);
          }
        }
        console.log("TI", this.tickets.length > 0);
      });
    }
  },
  computed : {
    sortedTickets : function (){
      let ticketsToDisplay = this.tickets;
      if(this.selectedSorting === "Priorité"){
        return ticketsToDisplay.sort((a, b) => a.importance.localeCompare(b.importance));
      }
      if(this.selectedSorting === "Ancienneté"){
        return ticketsToDisplay.sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
      }
      if(this.selectedSorting === "Projet"){
        return ticketsToDisplay.sort((a, b) => a.projet.nom.localeCompare(b.projet.nom));
      }
      return ticketsToDisplay;
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