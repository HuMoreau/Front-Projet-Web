<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg  p-button-secondary p-button-text mr-3"
                   @click="goTo('/users')"/>
      <label class="p-panel-title mr-2">Nouvel Utilisateur</label>
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
            <InputText v-model="v$.utilisateur.prenom.$model"
                       :class="{'p-invalid': v$.utilisateur.prenom.$invalid && submitted}">
            </InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('prenom', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
          <div class="col-12 flex flex-column">
            <label>Nom</label>
            <InputText v-model="v$.utilisateur.nom.$model"
                       :class="{'p-invalid': v$.utilisateur.nom.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
          <div class="col-12 flex flex-column">
            <label>Mot de passe</label>
            <PassWord v-model="v$.utilisateur.password.$model"
                       :class="{'p-invalid': v$.utilisateur.password.$invalid && submitted}" toggleMask></PassWord>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('password', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <label>Rôle</label>
            <SelectButton class="align-self-center"
                          v-model="v$.utilisateur.type.$model" :options="typeOptions" dataKey="value"
                          :class="{'p-invalid': v$.utilisateur.type.$invalid && submitted}">
              <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('value', v$.$errors)" :key="error.$uid"
                     class="p-error">{{error.$message}}</small>
              <template #option="slotProps">
                <span>
                  <i :class="slotProps.option.icon" class="mr-1"></i>
                  {{slotProps.option.value}}
                </span>
              </template>
            </SelectButton>
          </div>
          <div class="col-12 flex flex-column">
            <label>Contact</label>
            <InputText v-model="v$.utilisateur.email.$model"
                       :class="{'p-invalid': v$.utilisateur.email.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('email', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
          <div class="col-12 flex flex-column">
            <label>Confirmer mot de passe</label>
            <PassWord v-model="v$.utilisateur.confirmPassword.$model"
                      :class="{'p-invalid': v$.utilisateur.confirmPassword.$invalid && submitted}" toggleMask></PassWord>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('confirmPassword', v$.$errors)" :key="error.$uid"
                   class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-4 text-align-center align-self-center">
            <div class="inline-flex align-self-center align-items-center">
              <label class="mr-2 mb-2">Photo de profil</label>
            </div>
            <div class="align-self-center">
              <AvatarIcon v-if="utilisateur.profilePicture"
                          :image="utilisateur.profilePicture"
                          class="displayed-profil-picture" shape="circle" size="xlarge"/>
              <AvatarIcon v-else :label="uppercaseFirstLetterName"
                          class="displayed-profil-picture" shape="circle" size="xlarge"
                          :style="'background-color:' + getColorFromUserName + ';color : #fff'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, alpha, helpers, sameAs} from '@vuelidate/validators'
import {apiService} from "@/main";
export default {
  name: "UserCreate",
  setup () {
    return { v$: useVuelidate() }
  },
  created() {
    if(this.$route.query.mod){
      this.modification = (this.$route.query.mod === 'true');
    }
  },
  data(){
    return {
      submitted : false,
      utilisateur : {
        type : null,
        nom : null,
        prenom : null,
        profilePicture : null,
        email : null,
        password : null,
        confirmPassword : null,
        noisettes : null
      },
      typeOptions: [
        {icon: 'pi pi-desktop', value: 'DEV'},
        {icon: 'pi pi-phone', value: 'RAP'}
      ]
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
        let queryURL = "";
        let type = this.utilisateur.type.value;
        switch (type) {
          case 'DEV':
            queryURL = 'developpeur/';
            break;
          case 'RAP':
            queryURL = 'rapporteur/';
            break;

          default: return;
        }

        this.utilisateur.type = type;

        apiService.post(queryURL, this.utilisateur).then(() => {
          this.$router.push('/users');
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
  computed: {
    uppercaseFirstLetterName: function () {
      return this.utilisateur.prenom ? this.utilisateur.prenom.charAt(0).toUpperCase() : '';
    },
    getFirstAndLastName : function () {
      return this.utilisateur.prenom + ' ' + this.utilisateur.nom;
    },
    getColorFromUserName : function () {
      let hash = 0;
      if(this.utilisateur.prenom){
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
      utilisateur: {
        type: {
          value: {
            required
          }
        },
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
          email : helpers.withMessage("Ce champs doit contenir une adresse email valide", email)
        },
        password : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        confirmPassword : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          sameAsPassword: helpers.withMessage("Ce champs doit être identique avec password",sameAs(this.utilisateur.password)),
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

div>.p-avatar.displayed-profil-picture{
  width: 6rem;
  height: 6rem;
  font-size: 4rem;
}
</style>