<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Tickets en cours</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" @click="goTo('/tickets')"/>
      <DropDown v-model="selectedSorting" :options="sortingList" optionLabel="name" class="ml-auto" placeholder="Trier par" :disabled="!tickets"/>
    </div>
    <div v-if="tickets" class="p-panel-content no-padding max-min-h-35vh">
      <VisuelTicket v-for="ticket in this.tickets" :key="ticket.id" :ticket-to-display="ticket"/>
    </div>
    <div v-else class="p-panel-content no-padding border-bottom">
      <div class="flex flex-column justify-content-center align-items-center p-3">
        <label class="mb-2">Vous n'avez aucun ticket en cours !</label>
        <PrimeButton label="TICKETS" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right" @click="goTo('/tickets')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelTicket from "@/components/HomePage/Displayers/Visuels/VisuelDisplayerTicket";

export default {
  name: "ProjetTicketDisplayer",
  components: {VisuelTicket},
  props: {
    tickets: Object
  },
  data(){
    return {
      selectedSorting : null,
      sortingList : [
        {name : "Priorité"},
        {name : "Ancienneté"},
        {name : "Projet"}
      ]
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