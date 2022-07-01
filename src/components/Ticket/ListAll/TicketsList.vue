<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Tickets</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
                     @click="goTo('/tickets/new')"/>
        <div class="utility-buttons flex align-items-center">
          <SelectButton class="mr-2" v-model="descriptionDisplayed" :options="displayDescriptionOptions" dataKey="value">
            <template #option="slotProps">
              <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
          <DropDown class="mr-2" placeholder="Trier par" v-model="sortingOption" :options="sortingOptions"
                    optionLabel="value" :showClear="true">
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <div>{{slotProps.value.name}}
                  <i :class="slotProps.value.icon"></i></div>
              </div>
              <div v-else>
                {{slotProps.placeholder}}
              </div>
            </template>
            <template #option="slotProps">
              <div>
                <div>{{slotProps.option.name}}
                  <i :class="slotProps.option.icon"></i></div>
              </div>
            </template>
          </DropDown>
          <InputText placeholder="Rechercher" class="mr-2" type="text" v-model="recherche" :disabled="!tickets"/>
          <PrimeButton :icon="filterDisplayed ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
                       label="Filtres" iconPos="right"
                       class="p-button-rounded p-button-secondary p-button-text"
                       @click="showOrHideFilters()"/>
        </div>
      </div>
      <div v-if="filterDisplayed" class="p-panel-header flex align-items-center justify-content-end filter-panel">
        <DropDown class="mr-2" placeholder="Avancement" v-model="selectedFilters.avancement"
                  :options="avancementList" optionLabel="name" :showClear="true">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <span :class="'importance-badge ' + slotProps.value.value">{{slotProps.value.name}}</span>
            </div>
            <span v-else>
            {{slotProps.placeholder}}
        </span>
          </template>
          <template #option="slotProps">
            <div>
              <span :class="'importance-badge ' + slotProps.option.value">{{slotProps.option.name}}</span>
            </div>
          </template>
        </DropDown>
        <DropDown class="mr-2" placeholder="Importance" v-model="selectedFilters.importance"
                  :options="importanceList" optionLabel="name" :showClear="true">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <span :class="'importance-badge ' + slotProps.value.name.toLowerCase()">{{slotProps.value.name}}</span>
            </div>
            <span v-else>
            {{slotProps.placeholder}}
        </span>
          </template>
          <template #option="slotProps">
            <div>
              <span :class="'importance-badge ' + slotProps.option.name.toLowerCase()">{{slotProps.option.name}}</span>
            </div>
          </template>
        </DropDown>
        <DropDown class="mr-2" placeholder="Developpeur" v-model="selectedFilters.developpeur"
                  :options="developpeursList" optionLabel="nom" :filter="true" :showClear="true"
                  filterPlaceholder="Nom">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              {{slotProps.value.prenom + " " + slotProps.value.nom}}
            </div>
            <span v-else>
            {{slotProps.placeholder}}
            </span>
          </template>
          <template #option="slotProps">
            <div>
              {{slotProps.option.prenom + " " + slotProps.option.nom}}
            </div>
          </template>
        </DropDown>
        <DropDown class="mr-2" placeholder="Rapporteur" v-model="selectedFilters.rapporteur"
                  :options="rapporteursList" optionLabel="nom" :filter="true" :showClear="true"
                  filterPlaceholder="Nom">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              {{slotProps.value.prenom + " " + slotProps.value.nom}}
            </div>
            <span v-else>
            {{slotProps.placeholder}}
            </span>
          </template>
          <template #option="slotProps">
            <div>
              {{slotProps.option.prenom + " " + slotProps.option.nom}}
            </div>
          </template>
        </DropDown>
        <DropDown class="mr-2" placeholder="Client" v-model="selectedFilters.client"
                  :options="clientsList" optionLabel="prenom" :filter="true" :showClear="true"
                  filterPlaceholder="Nom">
          <template #value="slotProps">
            <div v-if="slotProps.value">
              {{slotProps.value.prenom + " " + slotProps.value.nom}}
            </div>
            <span v-else>
            {{slotProps.placeholder}}
            </span>
          </template>
          <template #option="slotProps">
            <div>
              {{slotProps.option.prenom + " " + slotProps.option.nom}}
            </div>
          </template>
        </DropDown>
        <DropDown class="mr-2" placeholder="Projet" v-model="selectedFilters.projet"
                  :options="projetsList" optionLabel="nom" :filter="true" :showClear="true">
        </DropDown>
        <PrimeButton icon="pi pi-times" iconPos="right" :disabled="!isThereAFilterSelected"
                     class="p-button-rounded p-button-danger p-button-text mr-2"
                     @click="resetFilters()"/>
      </div>
      <div v-if="tickets && ticketsToDisplay" class="p-panel-content no-padding max-min-h-90vh">
        <VisuelTicket v-for="ticket in this.ticketsToDisplay" :key="ticket.id"
                      :display-description="isDescriptionDisplayed"
                      :ticket-to-display="ticket" @deleteMe="deleteTicket($event)"/>
      </div>
      <div v-else-if="tickets" class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Aucun ticket ne correspond à vos critères</label>
        </div>
      </div>
      <div v-else class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Il n'y a aucun ticket ! (Mais vous pouvez en créer un)</label>
          <PrimeButton label="CRÉER TICKET" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
        </div>
      </div>
    </div>

    <!--  Modal de suppression  -->
    <TicketDeleteModal @closeMe="closeDeleteModal($event)" :displayed="isDeletionModalDisplayed" :ticket-to-display="ticketToDelete"/>

  </div>

</template>

<script>

import VisuelTicket from "@/components/Ticket/ListAll/VisuelTicket";
import TicketDeleteModal from "@/components/Ticket/DeleteOne/TicketDeleteModal";
import {apiService} from "@/main";
export default {
  name: "TicketsList",
  components: {TicketDeleteModal, VisuelTicket},
  data() {
    return {
      filterDisplayed : false,
      recherche : null,
      isDeletionModalDisplayed : false,
      ticketToDelete : null,
      sortingOption : null,
      descriptionDisplayed : {icon : 'pi pi-minus', value : false},
      sortingOptions : [
        {value : "dateDeCreationCroissante", name : "Date de création", icon : "pi pi-sort-numeric-down"},
        {value : "dateDeCreationDecroissante", name : "Date de création", icon : "pi pi-sort-numeric-up"},
      ],
      selectedFilters : {
        avancement : null,
        importance : null,
        developpeur : null,
        rapporteur : null,
        client : null,
        projet : null,
      },
      importanceList : [
        {value : 'URGENT', name : 'Urgent'},
        {value : 'IMPORTANT', name : 'Important'},
        {value : 'MINEUR', name : 'Mineur'},
      ],
      avancementList : [
        {value : 'A_FAIRE', name : 'À faire'},
        {value : 'EN_COURS', name : 'En cours'},
        {value : 'FINI', name : 'Fini'},
      ],
      developpeursList : [],
      rapporteursList : [],
      clientsList : [],
      projetsList : [],
      displayDescriptionOptions : [
        {icon : 'pi pi-minus-circle', value : false},
        {icon : 'pi pi-info-circle', value : true}
      ],
      tickets : []
    }
  },
  mounted() {
    // api
    this.populate();
  },
  methods: {
    populate() {
      apiService.get("developpeur").then(response => {
        this.developpeursList = response.data;
      });
      apiService.get("rapporteur").then(response => {
        this.rapporteursList = response.data;
      });
      apiService.get("client").then(response => {
        this.clientsList = response.data;
      });
      apiService.get("projet").then(response => {
        this.projetsList = response.data;
      });

      // list of tickets
      apiService.get("ticket").then(response => {
        this.tickets = response.data;
      });
    },
    deleteTicket(event){
      this.ticketToDelete = event;
      this.isDeletionModalDisplayed = true;
    },
    closeDeleteModal(isDeleted){
      if (isDeleted) {
        this.populate();
      }
      this.ticketToDelete = null;
      this.isDeletionModalDisplayed = false;
    },
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
    showOrHideFilters(){
      this.filterDisplayed = !this.filterDisplayed;
    },
    resetFilters(){
      this.selectedFilters.importance = null;
      this.selectedFilters.avancement = null;
      this.selectedFilters.client = null;
      this.selectedFilters.projet = null;
      this.selectedFilters.rapporteur = null;
      this.selectedFilters.developpeur = null;
      this.recherche = null;
    },
  },
  computed: {
    ticketsToDisplay : function (){
      let result = this.tickets;
      if(this.recherche){
        result = result.filter(ticket =>
            ticket.nom.toLowerCase().includes(this.recherche.toLowerCase()))
      }
      if(this.selectedFilters.projet){
        result = result.filter(ticket => ticket.projet.id === this.selectedFilters.projet.id)
      }
      if(this.selectedFilters.client){
        result = result.filter(ticket => ticket.client.id === this.selectedFilters.client.id)
      }
      if(this.selectedFilters.rapporteur){
        result = result.filter(ticket => ticket.rapporteur.id === this.selectedFilters.rapporteur.id)
      }
      if(this.selectedFilters.developpeur){
        result = result.filter(ticket => ticket.developpeur.id === this.selectedFilters.developpeur.id)
      }
      if(this.selectedFilters.avancement){
        result = result.filter(ticket => ticket.etatAvancement === this.selectedFilters.avancement.value)
      }
      if(this.selectedFilters.importance){
        result = result.filter(ticket => ticket.importance === this.selectedFilters.importance.value)
      }
      if(this.sortingOption){
        if(this.sortingOption.value === "dateDeCreationCroissante"){
          result = result.sort((ticket1, ticket2) => new Date(ticket1.dateStart) - new Date(ticket2.dateStart));
        }
        if(this.sortingOption.value === "dateDeCreationDecroissante"){
          result = result.sort((ticket1, ticket2) => new Date(ticket2.dateStart) - new Date(ticket1.dateStart));
        }
      }
      return result.length === 0 ? null : result;
    },
    isThereAFilterSelected : function (){
      return !Object.values(this.selectedFilters).every(filter => filter === null) || this.recherche;
    },
    isDescriptionDisplayed : function(){
      return this.descriptionDisplayed.value ? this.descriptionDisplayed.value : false;
    }
  }
}
</script>

<style scoped>
  .p-panel-header.filter-panel{
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
  }
</style>