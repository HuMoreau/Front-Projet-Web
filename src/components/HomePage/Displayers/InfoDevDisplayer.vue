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
export default {
  name: "InfoDev",
  data(){
    return {
      ticketsParJour : 3.46,
      tempsDeResolutionTicketMoyen : '1h13',
      projetFavori : "Projet 2",
      classementNoisette : "3",
      stackedData: {
        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
        datasets: [{
          type: 'bar',
          label: 'Mineurs',
          backgroundColor: '#c8e6c9',
          data: [
            23,
            31,
            12,
            28,
            17,
            43,
            11
          ]
        }, {
          type: 'bar',
          label: 'Importants',
          backgroundColor: '#ffd8b2',
          data: [
            19,
            14,
            8,
            23,
            34,
            12,
            22
          ]
        }, {
          type: 'bar',
          label: 'Urgents',
          backgroundColor: '#FFCDD2',
          data: [
            11,
            9,
            8,
            13,
            18,
            7,
            4
          ]
        }]
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
  }
}
</script>

<style scoped>

</style>