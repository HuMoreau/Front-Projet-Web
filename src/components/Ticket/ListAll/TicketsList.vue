<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Tickets</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
                     @click="goTo('/tickets/new')"/>
        <div class="utility-buttons flex align-items-center">
          <DropDown class="mr-2" placeholder="Trier par">
          </DropDown>
          <InputText placeholder="Rechercher" class="mr-2" type="text" v-model="recherche" :disabled="!tickets"/>
          <PrimeButton :icon="filterDisplayed ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
                       label="Filtres" iconPos="right"
                       class="p-button-rounded p-button-secondary p-button-text"
                       @click="showOrHideFilters()"/>
        </div>
      </div>
      <div v-if="filterDisplayed" class="p-panel-header flex align-items-center justify-content-end filter-panel">
        <DropDown class="mr-2" placeholder="Avancement">
        </DropDown>
        <DropDown class="mr-2" placeholder="Importance">
        </DropDown>
        <DropDown class="mr-2" placeholder="Acteur">
        </DropDown>
        <DropDown class="mr-2" placeholder="Client">
        </DropDown>
        <DropDown class="mr-2" placeholder="Projet">
        </DropDown>
      </div>
      <div v-if="tickets" class="p-panel-content no-padding max-min-h-90vh">
        <VisuelTicket v-for="ticket in this.ticketsToDisplay" :key="ticket.id" :display-description="true"
                    :ticket-to-display="ticket" @deleteMe="deleteTicket($event)"/>
      </div>
      <div v-else class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Il n'y a aucun utilisateur ! (Mais comment vous êtes-vous connecté ?)</label>
          <PrimeButton label="CRÉER UTILISATEUR" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
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
      filterDisplayed : true,
      recherche : null,
      isDeletionModalDisplayed : false,
      ticketToDelete : null,
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
      acteurs : [
        {id : 1, type : 'DEV', prenom : 'Louison', nom : 'Armand'},
        {id : 2, type : 'RAP', prenom : 'Sebastien', nom : 'Agnez'},
        {id : 3, type : 'DEV', prenom : 'Guillaume', nom : 'Conchon'},
        {id : 4, type : 'RAP', prenom : 'Flavien', nom : 'Perineau'},
      ],
      clients : [
        {id : 1, prenom : 'Pierre', nom : 'LeGoff'},
        {id : 2, prenom : 'Aurélien', nom : 'Avite'},
        {id : 3, prenom : 'Virgile', nom : 'Armand'},
        {id : 4, prenom : 'Nathan', nom : 'Barre'},
      ],
      projets : [
        {id : 1, nom : 'Projet 1'},
        {id : 2, nom : 'Projet 2'},
        {id : 3, nom : 'Projet 3'},
        {id : 4, nom : 'Projet 4'},
      ],
      tickets : [
        {
          id: 1,
          idDev: null,
          idRapporteur: 1,
          nom:'Ça marche po',
          dateStart:'17/05/2022',
          etatAvancement: 'EN_COURS',
          importance: 'HIGH',
          description : "C'est un désastre le projet ne fonctionne plus, et l'unique disque dur sur lequel était le code est tombé dans la mare aux canards. Les serveurs ont cramés parce que Pierrot à oublié des tranches de salami dans la ventilation. La deadline est pour ce soir et le stagiaire est parti hier (comme ma femme). Il faut que je me dépêche d'apprendre le C++ sur Open Classroom ! :)",
          idProjet : 1,
          idClient : 1,
          dateAssign : null,
          dateEnd : null,
        },
        {
          id: 2,
          idDev: 2,
          idRapporteur: 2,
          nom:'Fote dortograffe',
          dateStart:'17/05/2022',
          etatAvancement: 'A_FAIRE',
          importance: 'LOW',
          description : "Le clian ce plaint des fotes dans les label de lapli, srx fête atenssion les ga aprai je me fé grondé par les clian et parfoi jy pance dans mon lis la nui avec come quan Margo elle voulé pa aitre mon namoureuze en sinquiaime et je pleur après :'(",
          idProjet : 2,
          idClient : 2,
          dateAssign : '17/05/2022',
          dateEnd : null,
        },
        {
          id: 3,
          idDev: 3,
          idRapporteur: 3,
          nom:"Oups :/",
          dateStart:'17/05/2022',
          etatAvancement: 'FINI',
          importance: 'MEDIUM',
          description : "Les gars je crois que j'ai drop la database hihi ^^' Et j'ai drop le backup aussi :O Mais je me souviens de deux trois tables si vous voulez ! :3 " ,
          idProjet : 3,
          idClient : 3,
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
    }
  },
  computed: {
    ticketsToDisplay : function (){
      let result = this.tickets;
      if(this.recherche){
        result = result.filter(ticket =>
            ticket.nom.toLowerCase().includes(this.recherche.toLowerCase()))
      }
      return result;
    },
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