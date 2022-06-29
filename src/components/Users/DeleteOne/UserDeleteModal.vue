<template>
  <PrimeDialog header="ATTENTION" :visible.sync="isDisplayed" :containerStyle="{width: '50vw'}" :modal="true"
               @hide="abortSuppression">
    <p class="m-0">Vous êtes sur le point de supprimer
      <strong>{{userToDisplay ? userToDisplay.prenom : '-'}} {{userToDisplay ? userToDisplay.nom : '-'}}</strong>
      - <strong>{{userToDisplay ? userToDisplay.type : '-'}}</strong>.</p>
    <p class="m-0">Voulez-vous continuer ?</p>
    <template #footer>
      <PrimeButton label="Annuler" icon="pi pi-times" @click="abortSuppression" class="p-button-text"/>
      <PrimeButton label="SUPPRIMER" icon="pi pi-trash" class="p-button-text p-button-danger"
              @click="deleteUser" autofocus />
    </template>
  </PrimeDialog>
</template>

<script>
import {apiService} from "@/main";

export default {
  name: "UserDeleteModal",
  props: {
    displayed : Boolean,
    userToDisplay : Object
  },
  data() {
    return {
      isDisplayed : false,
    }
  },
  methods: {
    deleteUser(){
      let queryURL = "";
      switch (this.userToDisplay.type) {
        case 'DEV':
          queryURL = 'developpeur/' + this.userToDisplay.id;
          break;
        case 'RAP':
          queryURL = 'rapporteur/' + this.userToDisplay.id;
          break;

        default: return;
      }

      // api call to delete client
      apiService.delete(queryURL).catch(error => {
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