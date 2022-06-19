<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg  p-button-secondary p-button-text mr-3"
                   @click="goTo('/projets')"/>
      <label class="p-panel-title mr-2">Infos - {{projet.nom}} - {{$route.params.id}}</label>
      <div class="inline-flex align-items-center ml-auto">
        <div class="flex flex-column align-items-center mr-2">
          <label>{{modification ? 'Modifiable' : 'Modifier'}}</label>
          <InputSwitch v-model="modification"/>
        </div>
        <PrimeButton icon="pi pi-save" class="p-button-rounded p-button-lg p-button-text"
                     :disabled="!(modification && v$.$anyDirty)" @click="submitModification(v$.$invalid)"/>
      </div>
    </div>
    <div class="grid grid-nogutter p-panel-content">
      <div class=" col-10 col-offset-1 grid">
        <div class="col-4 grid">
          <div class="col-12  flex flex-column">
            <label>Nom</label>
            <InputText v-model="v$.projet.nom.$model" :disabled="!modification"
                       :class="{'p-invalid': v$.projet.nom.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-8 grid">
          <PrimeChart type="bar" :data="basicData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
export default {
  name: "ProjetInfo",
  setup () {
    return { v$: useVuelidate() }
  },
  created() {
    if(this.$route.query.mod){
      console.log(this.$route.query.mod)
      this.modification = (this.$route.query.mod === 'true');
    }
  },
  data(){
    return {
      projet : {
        id: 1,
        nom : "LE PROJET KE JEM",
        nombreTicketsUrgents : 5,
        nombreTicketsImportants : 3,
        nombreTicketsMineurs : 12
      },
      modification : false,
      submitted : false,
      basicData: {
        labels: ["Urgents", "Importants", "Mineurs"],
        datasets: [
          {
            label: 'Tickets',
            backgroundColor: [
              '#FFCDD2',
              '#ffd8b2',
              '#c8e6c9'
            ],
            data: [
              // this.projet.nombreTicketsUrgents,
              // this.projet.nombreTicketsImportants,
              // this.projet.nombreTicketsMineurs
                5,3,12
            ],
          }
        ]
      },
    }
  },
  methods: {
    submitModification(invalid){
      this.submitted = invalid;
      if(!invalid){
        this.v$.$reset();
      }
    },
    getErrorsOfGivenFieldWhenSubmitted(field, errors){
      if(this.submitted){
        return errors ? errors.filter(error => error.$property === field) : [];
      }
      return [];
    },
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