<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg  p-button-secondary p-button-text mr-3"
                   @click="goTo('/projets')"/>
      <label class="p-panel-title mr-2">Nouveau projet</label>
      <div class="inline-flex align-items-center ml-auto">
        <PrimeButton icon="pi pi-save" class="p-button-rounded p-button-lg p-button-text"
                     :disabled="!v$.$anyDirty" @click="submitModification(v$.$invalid)"/>
      </div>
    </div>
    <div class="grid grid-nogutter p-panel-content">
      <div class=" col-4 col-offset-4 grid">
            <div class="col-12 flex flex-column">
              <label class="mb-2">Nom</label>
              <InputText v-model="v$.projet.nom.$model"
                         :class="{'p-invalid': v$.projet.nom.$invalid && submitted}"></InputText>
              <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid"
                     class="p-error">{{error.$message}}</small>
            </div>
      </div>
    </div>
    <PrimeToast />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
import {apiService} from "@/main";

export default {
  name: "ProjetCreate",
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  data(){
    return {
      projet : {
        nom : null
      },
      submitted : false,
    }
  },
  methods: {
    submitModification(invalid){
      this.submitted = invalid;
      if(!invalid){
        this.v$.$reset();

        // api call to create client
        // if success, redirect to client list
        // if error, display error message
        apiService.post('/projet', this.projet).then(() => {
          this.goTo('/projets', {display : 'create-success'});
        }).catch(() => {
          this.$toast.add({severity:'error',
            summary : 'Erreur',
            detail : `Une erreur n'a pas permis la création du projet`
          });
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