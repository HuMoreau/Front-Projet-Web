<template>
  <div id="content" class="p-panel p-component">
    <div class="p-panel-header">
      <label class="p-panel-title mr-2">Infos - {{getFirstAndLastName}}</label>
    </div>
    <div class="grid grid-nogutter p-panel-content">
      <div class=" col-10 col-offset-1 grid">
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <label>Prénom</label>
            <InputText v-model="utilisateur.fname" :disabled="!modification"></InputText>
          </div>
          <div class="col-12  flex flex-column">
            <label>Nom</label>
            <InputText v-model="utilisateur.lname" :disabled="!modification"></InputText>
          </div>
        </div>
        <div class="col-4 grid">
          <div class="col-12 flex flex-column">
            <label>Rôle</label>
            <SelectButton class="align-self-center" :disabled="!modification"
                          v-model="utilisateur.type" :options="typeOptions" dataKey="value">
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
            <InputText v-model="utilisateur.mail" :disabled="!modification"></InputText>
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
export default {
  name: "UserInfo",
  data(){
    return {
      modification : false,
      utilisateur : {
        id: 1,
        type : {icon: 'pi pi-desktop', value: 'DEV'},
        fname : "Ousseynou",
        lname : "Sakho",
        profilePicture : null,
        mail : 'email@email.com',
        noisettes : 16000
      },
      typeOptions: [
        {icon: 'pi pi-desktop', value: 'DEV'},
        {icon: 'pi pi-phone', value: 'RAP'}
      ]
    }
  },
  computed: {
    uppercaseFirstLetterName: function () {
      return this.utilisateur.fname.charAt(0).toUpperCase();
    },
    getFirstAndLastName : function () {
      return this.utilisateur.fname + ' ' + this.utilisateur.lname;
    },
    getColorFromUserName : function () {
      let hash = 0;
      for (let i = 0; i < this.utilisateur.fname.length; i++) {
        hash = this.utilisateur.fname.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
      }
      return colour;
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