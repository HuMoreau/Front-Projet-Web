<template>
  <div class="line-in-list flex align-items-center">
    <label class="mr-3"><strong>{{projetToDisplay.nom}}</strong> - {{nombreTotalTicket}} Tickets en cours </label>
    <PrimeChart type="pie" :data="chartData" :options="chartOptions" class="inline-pie-chart" :height="50"
                :width="50"/>
    <div id="go_to_buttons">
      <PrimeButton icon="pi pi-ticket" class="p-button-rounded p-button-secondary p-button-sm p-button-text"/>
      <PrimeButton icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-button-sm p-button-text"
                   @click="goTo(`/projets/${projetToDisplay.id}`, {mod : true})"/>
      <PrimeButton icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm p-button-text"
                   @click="deleteMe"/>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text"
                   @click="goTo(`/projets/${projetToDisplay.id}`)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelProjet",
  props : {
    projetToDisplay : Object,
  },data() {
    return {
      chartData: {
        labels: ['Urgents','Importants','Mineurs'],
        datasets: [
          {
            data: [this.projetToDisplay.nombreTicketsUrgents, this.projetToDisplay.nombreTicketsImportants, this.projetToDisplay.nombreTicketsMineurs],
            backgroundColor: [
              "#FFCDD2",
              "#ffd8b2",
              "#c8e6c9"
            ]
          }
        ]
      },
      chartOptions: {
        plugins : {
          legend: {
            display: false,
          },
          tooltip: {
            enabled : false,
          }
        }
      }
    }
  },
  methods: {
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
    deleteMe(){
      this.$emit('deleteMe', this.projetToDisplay);
    }
  },
  computed: {
    nombreTotalTicket: function (){
      return this.projetToDisplay.nombreTicketsUrgents + this.projetToDisplay.nombreTicketsImportants
          + this.projetToDisplay.nombreTicketsMineurs;
    }
  }
}
</script>

<style scoped>

#go_to_buttons{
  margin-left: auto;
}

.inline-pie-chart{
}
</style>