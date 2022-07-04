<template>
  <div class="p-component p-panel">
    <div class="p-panel-header flex align-items-center">
      <label class="p-panel-title mr-1">Stats Perso</label>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-secondary p-button-text" />
    </div>
    <div class="p-panel-content no-padding grid ml-0 mr-0 mt-0 align-items-center text-align-center">
      <label class="font-bold col-3">Tickets/Jour</label>
      <label class="font-bold col-3">Temps/Ticket</label>
      <label class="font-bold col-3">Projet Favori</label>
      <label class="font-bold col-3">Classement</label>
      <label class="col-3">{{ticketsParJour}}</label>
      <label class="col-3">{{tempsDeResolutionTicketMoyen}}</label>
      <label class="col-3">{{projetFavori}}</label>
      <label class="col-3">{{classementNoisette}}</label>
      <PrimeChart type="bar" class="col-12" :data="stackedData" :options="stackedOptions"/>
    </div>
  </div>
</template>

<script>
import {apiService} from "@/main";
import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

export default {
  name: "InfoDev",
  setup() {
    const authStore = useAuthStore();
    const {userId} = storeToRefs(authStore);
    return{
      userId
    }
  },
  data(){
    return {
      ticketsParJour : 0,
      tempsDeResolutionTicketMoyen : "",
      projetFavori : "",
      classementNoisette : "3",
      stackedData: {
        labels: [],
        datasets: [
          {
            type: 'bar',
            label: 'Mineurs',
            backgroundColor: '#c8e6c9',
            data: []
          },
          {
            type: 'bar',
            label: 'Importants',
            backgroundColor: '#ffd8b2',
            data: []
          },
          {
            type: 'bar',
            label: 'Urgents',
            backgroundColor: '#FFCDD2',
            data: []
          }
        ]
      },
      stackedOptions: {
        plugins: {
          tooltips: {
            mode: 'index',
            intersect: false
          },
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    }
  },
  mounted() {
    // api
    this.populate();
  },
  methods: {
    goTo(link, params){
      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
    populate: function () {
      // moyenne tickets par jour
      apiService.get("utils/AverageTicketsPerDay/FINI/dev/" + this.userId).then(response => {
        this.ticketsParJour = response.data.moyenne;
      });

      // moyenne temps de résolution ticket
      apiService.get("utils/AverageTimeSpendPerTicket/" + this.userId).then(response => {
        this.tempsDeResolutionTicketMoyen = response.data.moyenne;
      });

      // projet favori
      apiService.get("developpeur/TicketsDonePerProject/" + this.userId).then(response => {
        let projectName = "";
        let nbProjectMax = 0;

        for (let i = 0; i < response.data.length; i++) {
          const projet = response.data[i];
          // take the project with the most nbTicketFini
          if (nbProjectMax < projet.nbTicketFini) {
            nbProjectMax = projet.nbTicketFini;
            projectName = projet.nom;
          }
        }
        this.projetFavori = projectName;
      });

      // classement noisette
      apiService.get("developpeur").then(response => {

        // sort developpeurs list by noisette
        response.data.sort((a, b) => a.noisette - b.noisette);

        // get the classement of the current user in the list
        for (let i = 0; i < response.data.length; i++) {
          const developpeur = response.data[i];
          if (developpeur.id === this.userId) {
            this.classementNoisette = i + 1;
            break;
          }
        }

      });

      // bar chart
      apiService.get("utils/nbTickets/ALL/6/dev/" + this.userId).then(response => {
        let labels = [];
        let data = {
          MINEUR: [],
          IMPORTANT: [],
          URGENT: []
        };
        for (let i = 0; i < response.data.months.length; i++) {
          const month = response.data.months[i];
          labels.push(month.month);
          data.URGENT.push(month.URGENT);
          data.IMPORTANT.push(month.IMPORTANT);
          data.MINEUR.push(month.MINEUR);
        }
        this.stackedData.labels = labels;
        this.stackedData.datasets[0].data = data.MINEUR;
        this.stackedData.datasets[1].data = data.IMPORTANT;
        this.stackedData.datasets[2].data = data.URGENT;
      });
    }
  }
}
</script>

<style scoped>

</style>