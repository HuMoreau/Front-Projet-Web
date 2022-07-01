<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg  p-button-secondary p-button-text mr-3"
                   @click="goTo('/users')"/>
      <label class="p-panel-title mr-2">Infos - {{getFirstAndLastName}} - {{$route.params.id}}</label>
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
          <div class="col-12 flex flex-column">
            <label>Prénom</label>
            <InputText v-model="v$.utilisateur.prenom.$model" :disabled="!modification"
                       :class="{'p-invalid': v$.utilisateur.prenom.$invalid && submitted}">
            </InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('prenom', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
          </div>
          <div class="col-12  flex flex-column">
            <label>Nom</label>
            <InputText v-model="v$.utilisateur.nom.$model" :disabled="!modification"
                       :class="{'p-invalid': v$.utilisateur.nom.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <label>Rôle</label>
            <SelectButton class="align-self-center" :disabled="!modification"
                          v-model="v$.utilisateur.type.$model" :options="typeOptions" dataKey="value"
                          :class="{'p-invalid': v$.utilisateur.type.$invalid && submitted}">
              <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('value', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
              <template #option="slotProps">
                <span>
                  <i :class="slotProps.option.icon" class="mr-1"></i>
                  {{slotProps.option.value}}
                </span>
              </template>
            </SelectButton>
          </div>
          <div class="col-12  flex flex-column">
            <label>Contact</label>
            <InputText v-model="v$.utilisateur.email.$model" :disabled="!modification"
                       :class="{'p-invalid': v$.utilisateur.email.$invalid && submitted}"></InputText>
            <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('email', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
          </div>
        </div>
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <div class="inline-flex align-self-center align-items-center">
              <label class="mr-2">Photo de profil</label>
              <PrimeButton icon="pi pi-download" class="p-button-rounded p-button-sm p-button-text"
                           :disabled="!modification"/>
              <PrimeButton icon="pi pi-times" class="p-button-rounded p-button-danger p-button-sm p-button-text"
                           :disabled="!this.utilisateur.profilePicture || !modification"/>
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
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, alpha, helpers} from '@vuelidate/validators'
export default {
  name: "UserInfo",
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
      modification : false,
      submitted : false,
      utilisateur : {
        id: 1,
        type : {icon: 'pi pi-desktop', value: 'DEV'},
        prenom : "Ousseynou",
        nom : "Sakho",
        profilePicture : null,
        email : 'email@email.com',
        noisettes : 16000
      },
      typeOptions: [
        {icon: 'pi pi-desktop', value: 'DEV'},
        {icon: 'pi pi-phone', value: 'RAP'}
      ]
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

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
  },
  computed: {
    uppercaseFirstLetterName: function () {
      return this.utilisateur.prenom.charAt(0).toUpperCase();
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
        prenom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          alpha : helpers.withMessage("Ce champs ne peut être constitué que de caractères alphabétiques", alpha),
        },
        nom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          alpha : helpers.withMessage("Ce champs ne peut être constitué que de caractères alphabétiques", alpha),
        },
        email : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          email : helpers.withMessage("Ce champs doit contenir une adresse mail valide", email)
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