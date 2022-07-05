<template>
  <div class="p-component p-panel">
    <div class="p-panel-header">
      <label class="p-panel-title mr-1">Tickets en cours</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" @click="goTo('/tickets')"/>
      <DropDown v-model="selectedSorting" :options="sortingList" optionLabel="name" class="ml-auto" placeholder="Trier par" :disabled="!tickets"/>
    </div>
    <div v-if="tickets && tickets.length > 0" class="p-panel-content no-padding max-min-h-35vh">
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
import {apiService} from "@/main";
import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

export default {
  name: "SelectedTicketDisplayer",
  components: {VisuelTicket},
  setup() {
    const authStore = useAuthStore();
    const {userId} = storeToRefs(authStore);
    return{
      userId
    }
  },
  data(){
    return {
      tickets : null,
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
    populate() {
      apiService.get("ticket").then(response => {
        this.tickets = [];
        for(let i = 0; i < response.data.length; i++) {
          let ticket = response.data[i];
          if (ticket.developpeur.id === this.userId && ticket.etatAvancement === "EN_COURS") {
            this.tickets.push(ticket);
          }
        }
      });
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