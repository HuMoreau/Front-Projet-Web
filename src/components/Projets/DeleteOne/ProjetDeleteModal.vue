<template>
  <PrimeDialog header="ATTENTION" :visible.sync="isDisplayed" :containerStyle="{width: '50vw'}" :modal="true"
               @hide="abortSuppression">
    <p class="m-0">Vous êtes sur le point de supprimer le projet
      <strong>{{projetToDisplay ? projetToDisplay.nom : '-'}}</strong>.</p>
    <p class="m-0">Voulez-vous continuer ?</p>
    <template #footer>
      <PrimeButton label="Annuler" icon="pi pi-times" @click="abortSuppression" class="p-button-text"/>
      <PrimeButton label="SUPPRIMER" icon="pi pi-trash" class="p-button-text p-button-danger"
                   @click="deleteProjet" autofocus />
    </template>
  </PrimeDialog>
</template>

<script>
import {apiService} from "@/main";

export default {
  name: "ProjetDeleteModal",
  props: {
    displayed : Boolean,
    projetToDisplay : Object
  },
  data() {
    return {
      isDisplayed : false,
    }
  },
  methods: {
    deleteProjet(){

      // api call to delete client
      apiService.delete("/projet/" + this.projetToDisplay.id).catch(error => {
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
  watch : {
    displayed(value){
      this.isDisplayed = value;
    }
  }
}
</script>

<style scoped>

</style>