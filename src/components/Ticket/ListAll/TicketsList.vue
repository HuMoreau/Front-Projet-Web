<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Tickets</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
                     @click="goTo('/tickets/new')"/>
        <div class="utility-buttons flex align-items-center">
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
        <PrimeButton icon="pi pi-times" iconPos="right" :disabled="isThereAFilterSelected"
                     class="p-button-rounded p-button-danger p-button-text mr-2"
                     @click="resetFilters()"/>
      </div>
      <div v-if="tickets && ticketsToDisplay" class="p-panel-content no-padding max-min-h-90vh">
        <VisuelTicket v-for="ticket in this.ticketsToDisplay" :key="ticket.id" :display-description="true"
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
  </div>
</template>

<script>

import VisuelTicket from "@/components/Ticket/ListAll/VisuelTicket";
export default {
  name: "TicketsList",
  components: {VisuelTicket},
  data() {
    return {
      filterDisplayed : false,
      recherche : null,
      isDeletionModalDisplayed : false,
      ticketToDelete : null,
      sortingOption : null,
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
        {value : 'HIGH', name : 'Urgent'},
        {value : 'MEDIUM', name : 'Important'},
        {value : 'LOW', name : 'Mineur'},
      ],
      avancementList : [
        {value : 'A_FAIRE', name : 'À faire'},
        {value : 'EN_COURS', name : 'En cours'},
        {value : 'FINI', name : 'Fini'},
      ],
      developpeursList : [
        {id : 1, prenom : 'Louison', nom : 'Armand'},
        {id : 2, prenom : 'Sebastien', nom : 'Agnez'},
        {id : 3, prenom : 'Guillaume', nom : 'Conchon'},
        {id : 4, prenom : 'Flavien', nom : 'Perineau'},
      ],
      rapporteursList : [
        {id : 1, prenom : 'Marie', nom : 'Royal'},
        {id : 2, prenom : 'Thibaut', nom : 'Goldsborough'},
        {id : 3, prenom : 'Guillaume', nom : 'Fustaillon'},
        {id : 4, prenom : 'Théo', nom : 'Coucharierre'},
      ],
      clientsList : [
        {id : 1, prenom : 'Pierre', nom : 'LeGoff'},
        {id : 2, prenom : 'Aurélien', nom : 'Avite'},
        {id : 3, prenom : 'Virgile', nom : 'Armand'},
        {id : 4, prenom : 'Nathan', nom : 'Barre'},
      ],
      projetsList : [
        {id : 1, nom : 'Projet 1'},
        {id : 2, nom : 'Projet 2'},
        {id : 3, nom : 'Projet 3'},
        {id : 4, nom : 'Projet 4'},
      ],
      tickets : [
        {
          id: 1,
          developpeur: {
            nom: "Loppeur",
            prenom: "Dev",
            id: 1
          },
          rapporteur: {
            nom: "Porteur",
            prenom: "Rap",
            id: 1
          },
          nom:'Ça marche po',
          dateStart:'17/05/2022',
          etatAvancement: 'EN_COURS',
          importance: 'HIGH',
          description : "C'est un désastre le projet ne fonctionne plus, et l'unique disque dur sur lequel était le code est tombé dans la mare aux canards. Les serveurs ont cramés parce que Pierrot à oublié des tranches de salami dans la ventilation. La deadline est pour ce soir et le stagiaire est parti hier (comme ma femme). Il faut que je me dépêche d'apprendre le C++ sur Open Classroom ! :)",
          projet: {
            nom: "Projet 1",
            id: 1
          },
          client: {
            nom: "Ent",
            prenom: "Cli",
            id: 1
          },
          dateAssign : null,
          dateEnd : null,
        },
        {
          id: 2,
          developpeur: {
            nom: "Loppeur",
            prenom: "Dev",
            id: 2
          },
          rapporteur: {
            nom: "Porteur",
            prenom: "Rap",
            id: 2
          },
          nom:'Fote dortograffe',
          dateStart:'17/05/2022',
          etatAvancement: 'A_FAIRE',
          importance: 'LOW',
          description : "Le clian ce plaint des fotes dans les label de lapli, srx fête atenssion les ga aprai je me fé grondé par les clian et parfoi jy pance dans mon lis la nui avec come quan Margo elle voulé pa aitre mon namoureuze en sinquiaime et je pleur après :'(",
          projet: {
            nom: "Projet 1",
            id: 2
          },
          client: {
            nom: "Ent",
            prenom: "Cli",
            id: 2
          },
          dateAssign : '17/05/2022',
          dateEnd : null,
        },
        {
          id: 3,
          developpeur: {
            nom: "Loppeur",
            prenom: "Dev",
            id: 3
          },
          rapporteur: {
            nom: "Porteur",
            prenom: "Rap",
            id: 3
          },
          nom:"Oups :/",
          dateStart:'17/05/2022',
          etatAvancement: 'FINI',
          importance: 'MEDIUM',
          description : "Les gars je crois que j'ai drop la database hihi ^^' Et j'ai drop le backup aussi :O Mais je me souviens de deux trois tables si vous voulez ! :3 " ,
          projet: {
            nom: "Projet 1",
            id: 3
          },
          client: {
            nom: "Ent",
            prenom: "Cli",
            id: 3
          },
          dateAssign : '17/05/2022',
          dateEnd : '17/05/2022',
        },
      ]
    }
  },
  methods: {
    deleteTicket(event){
      this.ticketToDelete = event;
      this.isDeletionModalDisplayed = true;
    },
    closeDeleteModal(){
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
    }
  },
  computed: {
    ticketsToDisplay : function (){
      let result = this.tickets;
      if(this.recherche){
        result = result.filter(ticket =>
            ticket.nom.toLowerCase().includes(this.recherche.toLowerCase()))
      }
      if(this.selectedFilters.projet?.id){
        result = result.filter(ticket => ticket.projet.id === this.selectedFilters.projet.id)
      }
      if(this.selectedFilters.client?.id){
        result = result.filter(ticket => ticket.client.id === this.selectedFilters.client.id)
      }
      if(this.selectedFilters.rapporteur?.id){
        result = result.filter(ticket => ticket.rapporteur.id === this.selectedFilters.rapporteur.id)
      }
      if(this.selectedFilters.client?.id){
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
          result = result.sort((ticket1, ticket2) => new Date(ticket1.dateStart) - new Date(ticket2.dateStart))
        }
        if(this.sortingOption.value === "dateDeCreationDecroissante"){
          result = result.sort((ticket1, ticket2) => new Date(ticket2.dateStart) - new Date(ticket1.dateStart))
        }
      }
      return result.length === 0 ? null : result;
    },
    isThereAFilterSelected : function (){
      return Object.values(this.selectedFilters).every(filter => filter === null);
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