<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg  p-button-secondary p-button-text mr-3"
                   @click="goTo('/clients')"/>
      <label class="p-panel-title mr-2">Nouveau client</label>
      <div class="inline-flex align-items-center ml-auto">
        <PrimeButton icon="pi pi-save" class="p-button-rounded p-button-lg p-button-text"
                     :disabled="!v$.$anyDirty" @click="submitCreation(v$.$invalid)"/>
      </div>
    </div>
    <div class="grid grid-nogutter p-panel-content">
      <div class=" col-10 col-offset-1 grid">
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <label>Prénom</label>
            <InputText v-model="v$.client.prenom.$model"
                       :class="{'p-invalid': v$.client.prenom.$invalid && submitted}">
            </InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('prenom', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
          <div class="col-12  flex flex-column">
            <label>Nom</label>
            <InputText v-model="v$.client.nom.$model"
                       :class="{'p-invalid': v$.client.nom.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <label>Entreprise</label>
            <AutoComplete v-model="v$.client.entreprise.$model"
                          :suggestions="filteredEntreprises" @complete="searchEntreprise($event)"
                          :class="{'p-invalid': v$.client.entreprise.$invalid && submitted}"/>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('entreprise', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
          <div class="col-12  flex flex-column">
            <label>Contact</label>
            <InputText v-model="v$.client.email.$model"
                       :class="{'p-invalid': v$.client.email.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('email', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <div class="inline-flex align-self-center align-items-center">
              <label class="mr-2 mb-2">Photo de profil</label>
            </div>
            <div class="align-self-center">
              <AvatarIcon v-if="client.profilePicture"
                          :image="client.profilePicture"
                          class="displayed-profil-picture" shape="circle" size="xlarge"/>
              <AvatarIcon v-else :label="uppercaseFirstLetterName"
                          class="displayed-profil-picture" shape="circle" size="xlarge"
                          :style="'background-color:' + getColorFromClientName + ';color : #fff'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, alpha, helpers} from '@vuelidate/validators'
import {apiService} from "@/main";
export default {
  name: "ClientCreate",
  setup () {
    return { v$: useVuelidate() }
  },
  mounted() {
    apiService.get('utils/enterprises').then(response => {
      this.entreprises = response.data;
    }).catch(error => {
      console.log(error);
    });
  },
  created() {
    if(this.$route.query.mod){
      this.modification = (this.$route.query.mod === 'true');
    }
  },
  data(){
    return {
      submitted : false,
      entreprises : [],
      client : {
        prenom : null,
        nom : null,
        entreprise : null,
        email : null
      },
      filteredEntreprises : null,
    }
  },
  methods: {
    submitCreation(invalid){
      this.submitted = invalid;

      if(!invalid){
        this.v$.$reset();

        // api call to create client
        // if success, redirect to client list
        // if error, display error message
        apiService.post('/client', this.client).then(() => {
          this.$router.push('/clients');
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
    searchEntreprise(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredEntreprises = [...this.entreprises];
        }
        else {
          this.filteredEntreprises = this.entreprises.filter(entreprise => {
            return entreprise.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    }
  },
  computed: {
    uppercaseFirstLetterName: function () {
      return this.client.prenom ? this.client.prenom.charAt(0).toUpperCase() : '';
    },
    getFirstAndLastName : function () {
      return this.client.prenom + ' ' + this.client.nom;
    },
    getColorFromClientName : function () {
      let hash = 0;
      if(this.client.prenom){
        for (let i = 0; i < this.getFirstAndLastName.length; i++) {
          hash = this.getFirstAndLastName.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
      }
      else {
        return '#73C2FB'
      }
    }
  },
  validations () {
    return {
      client: {
        nom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          alpha : helpers.withMessage("Ce champs ne peut être constitué que de caractères alphabétiques", alpha),
        },
        prenom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          alpha : helpers.withMessage("Ce champs ne peut être constitué que de caractères alphabétiques", alpha),
        },
        email : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          email : helpers.withMessage("Ce champs doit contenir une adresse mail valide", email)
        },
        entreprise : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
      }
    }
  }
}
</script>

<style scoped>
.flex>label{
  margin-bottom: 0.25em;
}

div>.p-avatar.displayed-profil-picture{
  width: 6rem;
  height: 6rem;
  font-size: 4rem;
}
</style>