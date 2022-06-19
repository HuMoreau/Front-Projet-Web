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
      this.$emit('closeMe');
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