<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Clients</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
                     @click="goTo('/clients/new')"/>
        <div class="utility-buttons flex align-items-center">
          <DropDown v-model="entrepriseToShow" :options="this.entreprises" :filter="true" placeholder="Entreprise"
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
    <ClientDeleteModal @closeMe="closeDeleteModal($event)" :displayed="isDeletionModalDisplayed" :client-to-display="clientToDelete"/>
  </div>
</template>

<script>
import VisuelClient from "@/components/Clients/ListAll/VisuelClient";
import ClientDeleteModal from "@/components/Clients/DeleteOne/ClientDeleteModal";
import {apiService} from "@/main";

export default {
  name: "ClientsList",
  components: {ClientDeleteModal, VisuelClient},
  mounted() {
    this.populate();
  },
  data() {
    return {
      recherche : null,
      entrepriseToShow : null,
      isDeletionModalDisplayed : false,
      clientToDelete : null,
      clients : [],
      entreprises : []
    }
  },
  methods: {
    populate() {
      // call api to get all clients
      apiService.get("/client").then(response => {
        this.clients = response.data;
      });

      // call api to get all entreprises
      apiService.get('utils/enterprises').then(response => {
        this.entreprises = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    deleteClient(event){
      this.clientToDelete = event;
      this.isDeletionModalDisplayed = true;
    },
    closeDeleteModal(isDeleted){
      if (isDeleted) {
        this.populate();
      }
      this.clientToDelete = null;
      this.isDeletionModalDisplayed = false;
    },
    goTo(link, params){
      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
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
    }
  }
}
</script>

<style scoped>
.utility-buttons{
  margin-left: auto;
}
</style>