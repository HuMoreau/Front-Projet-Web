<template>
  <PrimeDialog header="ATTENTION" :visible.sync="isDisplayed" :containerStyle="{width: '50vw'}" :modal="true"
               @hide="abortSuppression">
    <p class="m-0">Vous êtes sur le point de supprimer le ticket
      <strong>{{ticketToDisplay ? ticketToDisplay.nom : '-'}}</strong> créé le
      <strong>{{dateStartFormated}}</strong>
      pour le projet <strong>{{ticketToDisplay ? ticketToDisplay.projet.nom : '-'}}</strong>.</p>
    <p class="m-0">Voulez-vous continuer ?</p>
    <template #footer>
      <PrimeButton label="Annuler" icon="pi pi-times" @click="abortSuppression" class="p-button-text"/>
      <PrimeButton label="SUPPRIMER" icon="pi pi-trash" class="p-button-text p-button-danger"
                   @click="deleteTicket" autofocus />
    </template>
  </PrimeDialog>
</template>

<script>
import {apiService} from "@/main";

export default {
  name: "TicketDeleteModal",
  props: {
    displayed : Boolean,
    ticketToDisplay : Object
  },
  data() {
    return {
      isDisplayed : false,
    }
  },
  methods: {
    deleteTicket(){
      // api call to delete client
      apiService.delete("ticket/" + this.ticketToDisplay.id).catch(error => {
        console.log(error);
        this.$emit('closeMe', false);
      }).finally(() => {
        this.$emit('closeMe', true);
      });
    },
    abortSuppression(){
      this.$emit('closeMe');
    }
  },
  computed : {
    dateStartFormated : function(){
      return this.ticketToDisplay.dateStart ? new Date(this.ticketToDisplay.dateStart).toLocaleDateString('fr') : '-';
    },
  },
  watch : {
    displayed(value){
      this.isDisplayed = value;
    }
  }
}
</script>

<style scoped>

</style>