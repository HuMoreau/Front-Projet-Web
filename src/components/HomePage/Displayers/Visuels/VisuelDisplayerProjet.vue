<template>
  <div class="projet flex" >
    <div class="flex justify-content-center align-items-center mr-5">
      <div>
        <label id="nomProjet">{{this.projetToDisplay.nom}}</label>
      </div>
    </div>
    <div class="flex flex-column justify-content-center align-items-center mr-2">
      <span class="importance-badge urgent">URGENTS</span>
      <label>{{this.projetToDisplay.nombreTicketsUrgents}}</label>
    </div>
    <div class="flex flex-column justify-content-center align-items-center mr-2">
      <span class="importance-badge important">IMPORTANTS</span>
      <label>{{this.projetToDisplay.nombreTicketsImportants}}</label>
    </div>
    <div class="flex flex-column justify-content-center align-items-center mr-2">
      <span class="importance-badge mineur">MINEURS</span>
      <label>{{this.projetToDisplay.nombreTicketsMineurs}}</label>
    </div>
    <div id="go_to_button">
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text" @click="goTo(`/projets/${projetToDisplay.id}`)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelDisplayerProjet",
  props: {
    projetToDisplay : Object
  },
  methods: {
    goTo(link, params){
      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    }
  }
}
</script>

<style scoped>
.projet{
  border-bottom: 1px solid #dee2e6;
  padding: 10px
}

#nomProjet{
  font-weight: bold;
}

#go_to_button{
  margin-left: auto;
}

</style>