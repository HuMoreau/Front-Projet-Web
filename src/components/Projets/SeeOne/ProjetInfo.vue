<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg  p-button-secondary p-button-text mr-3"
                   @click="goTo('/projets')"/>
      <label class="p-panel-title mr-2">Infos - {{projet.nom}}</label>
      <div class="inline-flex align-items-center ml-auto">
        <div class="flex align-self-center justify-content-center">
          <PrimeButton label="Ajouter un ticket" class="p-button-outlined p-button p-button-rounded mr-3" icon="pi pi-ticket"
                       @click="goTo('/tickets/new')"/>
        </div>
        <div class="flex flex-column align-items-center mr-2">
          <label>{{modification ? 'Modifiable' : 'Modifier'}}</label>
          <InputSwitch v-model="modification"/>
        </div>
        <PrimeButton icon="pi pi-save" class="p-button-rounded p-button-lg p-button-text"
                     :disabled="!(modification && v$.$anyDirty)" @click="submitModification(v$.$invalid)"/>
      </div>
    </div>
    <div class="grid grid-nogutter p-panel-content">
      <div class=" col-12 grid">
        <div class="col-4 grid">
          <div class="col-12 flex flex-column justify-content-center">
            <div class="col-12 flex flex-column">
              <label class="mb-2">Nom</label>
              <InputText v-model="v$.projet.nom.$model" :disabled="!modification"
                         :class="{'p-invalid': v$.projet.nom.$invalid && submitted}"></InputText>
              <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid"
                     class="p-error">{{error.$message}}</small>
            </div>
          </div>
        </div>
        <div class="col-8 flex justify-content-evenly align-items-center">
          <div>
            <PrimePanel header="Distribution des tickets en cours">
              <PrimeChart ref="graphique" type="bar" :data="basicData" :options="chartOptions"/>
            </PrimePanel>
          </div>
          <div>
            <PrimePanel header="Evolution du nombre de tickets">
              <PrimeChart type="line" :data="lineBasicData" :options="chartOptions"/>
            </PrimePanel>
          </div>
        </div>
      </div>
      <div class="col-12">
        <ProjetTicketDisplayer :tickets="tickets" id="selected_ticket_displayer"/>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
import {apiService} from "@/main";
import ProjetTicketDisplayer from "@/components/Projets/SeeOne/ProjetTicketDisplayer";

export default {
  name: "ProjetInfo",
  components: {ProjetTicketDisplayer},
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  created() {
    if(this.$route.query.mod){
      this.modification = (this.$route.query.mod === 'true');
    }
  },
  mounted() {
    // api
    this.populate();
  },
  data(){
    return {
      tickets: null,
      ticketsAreLoaded : false,
      projet : {
        id: null,
        nom : "",
        nombreTicketsUrgents : 0,
        nombreTicketsImportants : 0,
        nombreTicketsMineurs : 0
      },
      chartOptions: {
        plugins : {
          legend: {
            display: false,
          },
        }
      },
      modification : false,
      submitted : false,
      lineBasicData: {
        labels: [],
        datasets: [
          {
            label: 'Nombre de tickets',
            data: [],
            fill: true,
            borderColor: '#42A5F5',
            tension: .4,
            backgroundColor : 'rgba(66,165,245,0.2)'
          }
        ]
      }
    }
  },
  methods: {
    populate() {
      apiService.get('projet/' + this.$route.params.id).then(response => {
        this.projet = response.data;
      }).catch(error => {
        console.log(error);
      });

      apiService.get('projet/AllTickets/' + this.$route.params.id).then(response => {
        this.tickets = response.data;
        console.log(this.tickets);
      }).catch(error => {
        console.log(error);
      });

      apiService.get('utils/nbTickets/ALL/6/projet/' + this.$route.params.id).then(response => {
        let data = response.data;
        for (let i = 0; i < data.months.length; i++) {
          this.lineBasicData.labels.push(data.months[i].month);
          this.lineBasicData.datasets[0].data.push(data.months[i].URGENT + data.months[i].IMPORTANT + data.months[i].MINEUR);
          console.log(this.lineBasicData.datasets[0].data[i]);
        }


      }).catch(error => {
        console.log(error);
      });
    },
    submitModification(invalid){
      this.submitted = invalid;
      if(!invalid){
        this.v$.$reset();

        // api call to create client
        // if success, redirect to client list
        // if error, display error message
        apiService.put('/projet', this.projet).then(() => {
          this.$router.push('/projets');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    getErrorsOfGivenFieldWhenSubmitted(field, errors){
      if(this.submitted){
        return errors ? errors.filter(error => error.$property === field) : [];
      }
      return [];
    },
    goTo(link, params){

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
  },
  computed : {
    chartData: function (){
      return [
        this.projet.nombreTicketsUrgents,
        this.projet.nombreTicketsImportants,
        this.projet.nombreTicketsMineurs
      ]
    },
    basicData : function (){
      return {
        labels: ["Urgents", "Importants", "Mineurs"],
        datasets: [
          {
            label: 'Tickets',
            backgroundColor: [
              '#FFCDD2',
              '#ffd8b2',
              '#c8e6c9'
            ],
            data: this.chartData,
          }
        ]
      };
    }
  },
  validations () {
    return {
      projet: {
        nom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        }
      }
    }
  }
}
</script>

<style scoped>
.flex>label{
  margin-bottom: 0.25em;
}
</style>