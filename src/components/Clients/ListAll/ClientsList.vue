<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Clients</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
                     @click="goTo('/clients/new')"/>
        <div class="utility-buttons flex align-items-center">
          <DropDown v-model="entrepriseToShow" :options="listOfEntreprise" :filter="true" placeholder="Entreprise"
                    :showClear="true" class="mr-2"/>
          <InputText placeholder="Rechercher" type="text" class="ml-auto" v-model="recherche" :disabled="!clients"/>
        </div>
      </div>
      <div v-if="clients" class="p-panel-content no-padding max-min-h-90vh">
        <VisuelClient v-for="client in this.clientsToDisplay" :key="client.id"
                    :client-to-display="client" @deleteMe="deleteClient($event)"/>
      </div>
      <div v-else class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Il n'y a aucun client</label>
          <PrimeButton label="CRÉER CLIENT" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
        </div>
      </div>
    </div>

    <!--  Modal de suppression  -->
    <ClientDeleteModal @closeMe="closeDeleteModal" :displayed="isDeletionModalDisplayed" :client-to-display="clientToDelete"/>
  </div>
</template>

<script>
import VisuelClient from "@/components/Clients/ListAll/VisuelClient";
import ClientDeleteModal from "@/components/Clients/DeleteOne/ClientDeleteModal";
export default {
  name: "ClientsList",
  components: {ClientDeleteModal, VisuelClient},
  data() {
    return {
      recherche : null,
      entrepriseToShow : null,
      isDeletionModalDisplayed : false,
      clientToDelete : null,
      clients : [
        {id: 1, nom:'Tan', prenom:'Lucie', entreprise: 'BNP Paribas', email: 'lucie.tan@client.com'},
        {id: 2, nom:'Marande', prenom:'Paul', entreprise: 'Air Liquide', email: 'paul.marande@client.com'},
        {id: 3, nom:'Le Goff', prenom:'Pierre', entreprise: 'Armée de terre', email: 'pierre.legoff@client.com'},
        {id: 4, nom:'Avite', prenom:'Aurélien', entreprise: 'Safran', email: 'aurelien.avite@client.com'},
        {id: 5, nom:'Barre', prenom:'Nathan', entreprise: 'Ubisoft', email: 'nathan.barre@client.com'},
        {id: 6, nom:'Armand', prenom:'Virgile', entreprise: 'Foncaris', email: 'virgile.armand@client.com'},
        {id: 7, nom:'N Guyen', prenom:'Corentin', entreprise: 'Ubisoft', email: 'corentin.nguyen@client.com'},
      ]
    }
  },
  methods: {
    deleteClient(event){
      this.clientToDelete = event;
      this.isDeletionModalDisplayed = true;
    },
    closeDeleteModal(){
      this.clientToDelete = null;
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
    }
  },
  computed: {
    clientsToDisplay : function (){
      let result = this.clients;
      if(this.entrepriseToShow){
        result = result.filter(client => client.entreprise === this.entrepriseToShow);
      }
      if(this.recherche){
        result = result.filter(client =>
            client.prenom.toLowerCase().includes(this.recherche.toLowerCase())
            || client.nom.toLowerCase().includes(this.recherche.toLowerCase())
        );
      }
      return result;
    },
    listOfEntreprise : function (){
      return this.clients.map(client => client.entreprise)
          .sort()
          .filter((entreprise, pos, ary) => !pos || entreprise !== ary[pos -1]);
    }
  }
}
</script>

<style scoped>
.utility-buttons{
  margin-left: auto;
}
</style>