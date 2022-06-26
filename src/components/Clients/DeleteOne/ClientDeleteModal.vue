<template>
  <PrimeDialog header="ATTENTION" :visible.sync="isDisplayed" :containerStyle="{width: '50vw'}" :modal="true"
               @hide="abortSuppression">
    <p class="m-0">Vous êtes sur le point de supprimer
      <strong>{{clientToDisplay ? clientToDisplay.prenom : '-'}} {{clientToDisplay ? clientToDisplay.nom : '-'}}</strong>
      - <strong>{{clientToDisplay ? clientToDisplay.entreprise : '-'}}</strong>.</p>
    <p class="m-0">Voulez-vous continuer ?</p>
    <template #footer>
      <PrimeButton label="Annuler" icon="pi pi-times" @click="abortSuppression" class="p-button-text"/>
      <PrimeButton label="SUPPRIMER" icon="pi pi-trash" class="p-button-text p-button-danger"
                   @click="deleteClient" autofocus />
    </template>
  </PrimeDialog>
</template>

<script>
import {apiService} from "@/main";

export default {
  name: "ClientDeleteModal",
  props: {
    displayed : Boolean,
    clientToDisplay : Object
  },
  data() {
    return {
      isDisplayed : false,
    }
  },
  methods: {
    deleteClient(){

      // api call to delete client
      apiService.delete("/client/" + this.clientToDisplay.id).catch(error => {
        console.log(error);
        this.$emit('closeMe', false);
      }).finally(() => {
        this.$emit('closeMe', true);
      });
    },
    abortSuppression(){
      this.$emit('closeMe', false);
    }
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