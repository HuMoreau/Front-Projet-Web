<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header flex align-items-center">
      <PrimeButton icon="pi pi-chevron-left" class="p-button-rounded p-button-lg p-button-secondary p-button-text mr-3"
                   @click="goTo('/tickets')"/>
      <label class="p-panel-title mr-5">Infos - {{ticket.nom}}</label>
      <div class="flex flex-column mr-3 align-items-center">
        <label>Création</label>
        <label><i>{{ticket.dateStart ? ticket.dateStart : '-'}}</i></label>
      </div>
      <div class="flex flex-column mr-3 align-items-center">
        <label>Assignation</label>
        <label><i>{{ticket.dateAssign ? ticket.dateAssign : '-'}}</i></label>
      </div>
      <div class="flex flex-column mr-3 align-items-center">
        <label>Fermeture</label>
        <label><i>{{ticket.dateEnd ? ticket.dateEnd : '-'}}</i></label>
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
          <label>Nom</label>
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
                    :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
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
                    :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
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
                     :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value">
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
                    :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value">
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
                    :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value">
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
                    :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}">
            <template #value="slotProps">
              <div v-if="slotProps.value">
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
          <label>Description</label>
          <TextArea v-model="v$.ticket.description.$model" :autoResize="true" :disabled="!modification" rows="4"
                    :class="{'p-invalid': v$.ticket.nom.$invalid && submitted}"/>
          <small v-for="error of getErrorsOfGivenFieldWhenSubmitted('description', v$.$errors)" :key="error.$uid" class="p-error">{{error.$message}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
export default {
  name: "TicketInfo",
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
      modification: false,
      submitted: false,
      ticket: {
        id: 1,
        developpeur: {
          nom: "Armand",
          prenom: "Louison",
          id: 1
        },
        rapporteur: {
          nom: "Conchon",
          prenom: "Guillaume",
          id: 1
        },
        nom:'Ça marche po',
        dateStart:'05-16-2022',
        etatAvancement: 'EN_COURS',
        importance: 'HIGH',
        description : "C'est un désastre le projet ne fonctionne plus, et l'unique disque dur sur lequel était le code est tombé dans la mare aux canards. Les serveurs ont cramés parce que Pierrot à oublié des tranches de salami dans la ventilation. La deadline est pour ce soir et le stagiaire est parti hier (comme ma femme). Il faut que je me dépêche d'apprendre le C++ sur Open Classroom ! :)",
        projet: {
          nom: "Projet 1",
          id: 1
        },
        client: {
          nom: "Lumineau",
          prenom: "Théophane",
          id: 1
        },
        dateAssign : '06-17-2022',
        dateEnd : null,
      },
      avancementList : ['A_FAIRE', 'EN_COURS', 'FINI'],
      avancementValueList : [
        {value : 'A_FAIRE', name : 'À faire'},
        {value : 'EN_COURS', name : 'En cours'},
        {value : 'FINI', name : 'Fini'},
      ],
      importanceList : ['HIGH', 'MEDIUM', 'LOW'],
      importanceValueList : [
        {value : 'HIGH', name : 'Urgent'},
        {value : 'MEDIUM', name : 'Important'},
        {value : 'LOW', name : 'Mineur'},
      ],
      projetsList : [
        {id : 1, nom : 'Projet 1'},
        {id : 2, nom : 'Projet 2'},
        {id : 3, nom : 'Projet 3'},
        {id : 4, nom : 'Projet 4'},
      ],
      clientsList : [
        {id : 1, prenom : "Théophane", nom : 'Lumineau'},
        {id : 2, prenom : 'Aurélien', nom : 'Avite'},
        {id : 3, prenom : 'Virgile', nom : 'Armand'},
        {id : 4, prenom : 'Nathan', nom : 'Barre'},
      ],
      rapporteursList : [
        {id : 1, prenom : 'Guillaume', nom : 'Conchon'},
        {id : 2, prenom : 'Thibaut', nom : 'Goldsborough'},
        {id : 3, prenom : 'Guillaume', nom : 'Fustaillon'},
        {id : 4, prenom : 'Théo', nom : 'Coucharierre'},
      ],
      developpeursList : [
        {id : 1, prenom : 'Louison', nom : 'Armand'},
        {id : 2, prenom : 'Sebastien', nom : 'Agnez'},
        {id : 3, prenom : 'Guillaume', nom : 'Conchon'},
        {id : 4, prenom : 'Flavien', nom : 'Perineau'},
      ],
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
    concatenateFirstAndLastName(prenom, nom){
      return prenom + ' ' + nom;
    },
    uppercaseFirstLetterName(prenom) {
      return prenom.charAt(0).toUpperCase();
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
  validations () {
    return {
      ticket: {
        nom : {
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
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
          required : helpers.withMessage("Ce champs ne peut pas être vide !", required),
        },
        description : {
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

div>.p-avatar.displayed-profil-picture{
  width: 6rem;
  height: 6rem;
  font-size: 4rem;
}
</style>