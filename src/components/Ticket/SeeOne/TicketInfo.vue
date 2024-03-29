<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg p-button-secondary p-button-text mr-3"
                   @click="goTo('/tickets')"/>
      <label class="p-panel-title mr-5">Infos - {{ticket.nom}}</label>
      <div class="flex flex-column mr-3 align-items-center">
        <label>Création</label>
        <label><i>{{dateStartFormated}}</i></label>
      </div>
      <div class="flex flex-column mr-3 align-items-center">
        <label>Assignation</label>
        <label><i>{{dateAssignFormated}}</i></label>
      </div>
      <div class="flex flex-column mr-3 align-items-center">
        <label>Fermeture</label>
        <label><i>{{dateEndFormated}}</i></label>
      </div>
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
      <div class="col-3 p-2">
        <div class="flex flex-column">
          <div class="flex justify-content-between">
            <label>Nom</label>
            <small :class="{'text-invalid': this.nomLength > this.nomMaxLength}">
              {{this.nomLength}} / {{this.nomMaxLength}}
            </small>
          </div>
          <InputText v-model="v$.ticket.nom.$model" :disabled="!modification"
                     :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
          </InputText>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('nom', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
      <div class="col-3 p-2">
        <div class="flex flex-column">
          <label>Avancement</label>
          <DropDown placeholder="Avancement" v-model="v$.ticket.etatAvancement.$model"
                    :options="avancementList" :disabled="!modification"
                    :class="{'p-invalid': v$.ticket.etatAvancement.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <span :class="'importance-badge ' + slotProps.value">
                  {{avancementValueList.find(avancement => avancement.value === slotProps.value).name}}</span>
              </div>
              <span v-else>
            {{slotProps.placeholder}}
        </span>
            </template>
            <template #option="slotProps">
              <div>
                <span :class="'importance-badge ' + slotProps.option">
                  {{avancementValueList.find(avancement => avancement.value === slotProps.option).name}}</span>
              </div>
            </template>
          </DropDown>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('etatAvancement', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
      <div class="col-3 p-2">
        <div class="flex flex-column">
          <label>Importance</label>
          <DropDown placeholder="Importance" v-model="v$.ticket.importance.$model"
                    :options="importanceList" :disabled="!modification"
                    :class="{'p-invalid': v$.ticket.importance.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <span :class="'importance-badge ' + importanceValueList.find(importance => importance.value === slotProps.value).name.toLowerCase()">
                  {{importanceValueList.find(importance => importance.value === slotProps.value).name}}</span>
              </div>
              <span v-else>
            {{slotProps.placeholder}}
        </span>
            </template>
            <template #option="slotProps">
              <div>
                <span :class="'importance-badge ' + importanceValueList.find(importance => importance.value === slotProps.option).name.toLowerCase()">
                  {{importanceValueList.find(importance => importance.value === slotProps.option).name}}</span>
              </div>
            </template>
          </DropDown>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('importance', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
      <div class="col-3 p-2">
        <div class="flex flex-column">
          <div class="flex"><label>Projet </label><i class="pi pi-chevron-right iconBtn ml-1" @click="goTo(`/projets/${ticket.projet.id}`)"></i></div>
          <DropDown  placeholder="Projet" v-model="v$.ticket.projet.$model"
                     :options="projetsList" optionLabel="id" :filter="true" :disabled="!modification"
                     :class="{'p-invalid': v$.ticket.projet.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.id">
                {{slotProps.value.nom}}
              </div>
              <span v-else>
            {{slotProps.placeholder}}
            </span>
            </template>
            <template #option="slotProps">
              <div>
                {{slotProps.option.nom}}
              </div>
            </template>
          </DropDown>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('projet', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
      <div class="col-4 p-2">
        <div class="flex flex-column">
          <div class="flex"><label>Client </label><i class="pi pi-chevron-right iconBtn ml-1" @click="goTo(`/clients/${ticket.client.id}`)"></i></div>
          <DropDown placeholder="Client" v-model="v$.ticket.client.$model"
                    :options="clientsList" optionLabel="id" :filter="true"
                    filterPlaceholder="Nom" :disabled="!modification"
                    :class="{'p-invalid': v$.ticket.client.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.id">
                <AvatarIcon :label="uppercaseFirstLetterName(slotProps.value.prenom)"
                            class="mr-2" shape="circle"
                            :style="'background-color:' + getColorFromUserName(slotProps.value.prenom, slotProps.value.nom) + ';color : #fff'"/>
                {{slotProps.value.prenom + " " + slotProps.value.nom}}
              </div>
              <span v-else>
            {{slotProps.placeholder}}
            </span>
            </template>
            <template #option="slotProps">
              <div>
                <AvatarIcon :label="uppercaseFirstLetterName(slotProps.option.prenom)"
                            class="mr-2" shape="circle"
                            :style="'background-color:' + getColorFromUserName(slotProps.option.prenom, slotProps.option.nom) + ';color : #fff'"/>
                {{slotProps.option.prenom + " " + slotProps.option.nom}}
              </div>
            </template>
          </DropDown>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('client', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
      <div class="col-4 p-2">
        <div class="flex flex-column">
          <div class="flex"><label>Rapporteur </label><i class="pi pi-chevron-right iconBtn ml-1" @click="goTo(`/users/rap/${ticket.rapporteur.id}`)"></i></div>
          <DropDown placeholder="Rapporteur" v-model="v$.ticket.rapporteur.$model"
                    :options="rapporteursList" optionLabel="id" :filter="true"
                    filterPlaceholder="Nom" :disabled="!modification"
                    :class="{'p-invalid': v$.ticket.rapporteur.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.id">
                <AvatarIcon :label="uppercaseFirstLetterName(slotProps.value.prenom)"
                            class="mr-2" shape="circle"
                            :style="'background-color:' + getColorFromUserName(slotProps.value.prenom, slotProps.value.nom) + ';color : #fff'"/>
                {{slotProps.value.prenom + " " + slotProps.value.nom}}
              </div>
              <span v-else>
            {{slotProps.placeholder}}
            </span>
            </template>
            <template #option="slotProps">
              <div>
                <AvatarIcon :label="uppercaseFirstLetterName(slotProps.option.prenom)"
                            class="mr-2" shape="circle"
                            :style="'background-color:' + getColorFromUserName(slotProps.option.prenom, slotProps.option.nom) + ';color : #fff'"/>
                {{slotProps.option.prenom + " " + slotProps.option.nom}}
              </div>
            </template>
          </DropDown>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('rapporteur', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
      <div class="col-4 p-2">
        <div class="flex flex-column">
          <div class="flex"><label>Developpeur </label><i class="pi pi-chevron-right iconBtn ml-1" @click="goTo(`/users/dev/${ticket.developpeur.id}`)"></i></div>
          <DropDown placeholder="Developpeur" v-model="v$.ticket.developpeur.$model"
                    :options="developpeursList" optionLabel="id" :filter="true"
                    filterPlaceholder="Nom" :disabled="!modification"
                    :class="{'p-invalid': v$.ticket.developpeur.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.id">
                <AvatarIcon :label="uppercaseFirstLetterName(slotProps.value.prenom)"
                            class="mr-2" shape="circle"
                            :style="'background-color:' + getColorFromUserName(slotProps.value.prenom, slotProps.value.nom) + ';color : #fff'"/>
                {{slotProps.value.prenom + " " + slotProps.value.nom}}
              </div>
              <span v-else>
            {{slotProps.placeholder}}
            </span>
            </template>
            <template #option="slotProps">
              <div>
                <AvatarIcon :label="uppercaseFirstLetterName(slotProps.option.prenom)"
                            class="mr-2" shape="circle"
                            :style="'background-color:' + getColorFromUserName(slotProps.option.prenom, slotProps.option.nom) + ';color : #fff'"/>
                {{slotProps.option.prenom + " " + slotProps.option.nom}}
              </div>
            </template>
          </DropDown>
        </div>
      </div>
      <div class="col-12 p-2">
        <div class="flex flex-column">
          <div class="flex justify-content-between"><label>Description</label>
            <small :class="{'text-invalid': this.descriptionLength > this.descriptionMaxLength}">{{this.descriptionLength}} / {{this.descriptionMaxLength}}</small></div>
          <TextArea v-model="v$.ticket.description.$model" :autoResize="true" :disabled="!modification" rows="4"
                    :class="{'p-invalid': v$.ticket.description.$invalid && submitted}"/>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('description', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {helpers, maxLength, required, requiredIf} from '@vuelidate/validators'
import {apiService} from "@/main";
import {useAuthStore} from "@/store/authStore";

export default {
  name: "TicketInfo",
  setup () {
    const authStore = useAuthStore();
    return {
      authStore,
      v$: useVuelidate()
    }
  },
  created() {
    if(this.$route.query.mod){
      this.modification = (this.$route.query.mod === 'true');
    }
  },
  data(){
    return {
      modification: false,
      submitted: false,
      nomMaxLength : 25,
      descriptionMaxLength : 500,
      ticket: {
        id: null,
        developpeur: null,
        rapporteur: null,
        nom: null,
        dateStart: null,
        etatAvancement: null,
        importance: null,
        description : null,
        projet: null,
        client: null,
        dateAssign : null,
        dateEnd : null,
      },
      avancementList : ['A_FAIRE', 'EN_COURS', 'FINI'],
      avancementValueList : [
        {value : 'A_FAIRE', name : 'À faire'},
        {value : 'EN_COURS', name : 'En cours'},
        {value : 'FINI', name : 'Fini'},
      ],
      importanceList : ['URGENT', 'IMPORTANT', 'MINEUR'],
      importanceValueList : [
        {value : 'URGENT', name : 'Urgent'},
        {value : 'IMPORTANT', name : 'Important'},
        {value : 'MINEUR', name : 'Mineur'},
      ],
      projetsList : [],
      clientsList : [],
      rapporteursList : [],
      developpeursList : [],
    }
  },
  mounted() {
    // api
    this.populate();
  },
  methods: {
    populate() {
      apiService.get('projet').then(response => {
        this.projetsList = response.data;
      });
      apiService.get('client').then(response => {
        this.clientsList = response.data;
      });
      apiService.get('rapporteur').then(response => {
        this.rapporteursList = response.data;
      });
      apiService.get('developpeur').then(response => {
        this.developpeursList = response.data;
      });
     apiService.get('ticket/' + this.$route.params.id).then(response => {
        this.ticket = response.data;
      })
    },
    submitModification(invalid){
      this.submitted = invalid;
      if(!invalid){
        this.v$.$reset();

        if (this.ticket.etatAvancement === 'FINI') this.ticket.dateEnd = this.dateNowComputed;

        let body = {
          id: this.ticket.id,
          idProjet: this.ticket.projet.id,
          idClient: this.ticket.client.id,
          idRapporteur: this.ticket.rapporteur.id,
          idDev: this.ticket.developpeur ? this.ticket.developpeur.id : null,
          nom: this.ticket.nom,
          dateStart: this.dateStartComputed,
          dateAssign: this.dateAssignComputed,
          dateEnd: this.dateEndComputed,
          etatAvancement: this.ticket.etatAvancement,
          importance: this.ticket.importance,
          description: this.ticket.description,
        };

        // sending request
        apiService.put('ticket', body).then(() => {
          this.goTo('/tickets', {display : "modification-success"})
          if (this.ticket.etatAvancement === 'FINI') this.authStore.refreshNoisette();
        }).catch(
            this.$toast.add({severity:'error',
              summary : 'Erreur',
              detail : `Une erreur n'a pas permis la modification du ticket`
            })
        );
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
    concatenateFirstAndLastName(prenom, nom){
      return prenom + ' ' + nom;
    },
    uppercaseFirstLetterName(prenom) {
      return prenom ? prenom.charAt(0).toUpperCase() : "";
    },
    getColorFromUserName(prenom, nom){
      let hash = 0;
      let nomPrenom = this.concatenateFirstAndLastName(prenom, nom);
      for (let i = 0; i < nomPrenom.length; i++) {
        hash = nomPrenom.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
      }
      return colour;
    }
  },
  computed : {
    dateStartComputed : function () {
      let date = new Date(this.ticket.dateStart);
      return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    },
    dateAssignComputed : function () {
      let date = new Date(this.ticket.dateAssign);
      return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    },
    dateEndComputed : function () {
      let date = new Date(this.ticket.dateEnd);
      return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    },
    dateNowComputed : function () {
      let date = new Date();
      return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    },
    nomLength : function (){
      return this.ticket.nom ? this.ticket.nom.length : 0;
    },
    descriptionLength : function (){
      return this.ticket.description ? this.ticket.description.length : 0;
    },
    dateStartFormated : function(){
      return this.ticket.dateStart ? new Date(this.ticket.dateStart).toLocaleDateString('fr') : '-';
    },
    dateAssignFormated : function(){
      return this.ticket.dateAssign ? new Date(this.ticket.dateAssign).toLocaleDateString('fr') : '-';
    },
    dateEndFormated : function(){
      return this.ticket.dateEnd ? new Date(this.ticket.dateEnd).toLocaleDateString('fr') : '-';
    }
  },
  validations () {
    return {
      ticket: {
        nom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          maxLength: maxLength(this.nomMaxLength)
        },
        etatAvancement : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        importance : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        projet : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        client : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        rapporteur : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        developpeur : {
          requiredIfFunction: requiredIf(this.ticket.etatAvancement !== 'A_FAIRE'),
        },
        description : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
          maxLength: maxLength(this.descriptionMaxLength)
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