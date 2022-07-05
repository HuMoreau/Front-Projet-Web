<template>
  <div class="flex flex-row justify-content-center align-items-center">
    <AvatarIcon :label="uppercaseFirstLetterName"
                class="mr-2" shape="circle"
                :style="'background-color:' + getColorFromUserName + ';color : #fff'"/>
    <div class="flex flex-column justify-content-center align-items-center mr-2">
      <label id="nomUtilisateur" class="mb-0">{{userPrenom ? userPrenom : '-'}}
        {{userNom ? userNom : '-'}}</label>
      <div v-if="isUserDev" class="flex flex-row justify-content-center align-items-center">
        <label id="pointsNoisette" class="mr-1">{{userNoisettes}}</label>
        <img alt="logo" src="./../../assets/noisette.png" height="15">
      </div>
    </div>
    <PrimeButton icon="pi pi-cog" class="p-button-rounded p-button-secondary p-button-text" @click="goTo(`/users/${userType}/${userId}`, {mod : true})"/>
    <PrimeButton icon="pi pi-sign-out" class="p-button-rounded p-button-text" @click="disconnect()"/>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

export default {
  name: "UserHeadbarInfo",
  setup() {
    const authStore = useAuthStore();
    const {userNom, userPrenom, userNoisettes, userId, userType} = storeToRefs(authStore);
    const {isUserDev} = authStore
    return{
      authStore,
      isUserDev,
      userNom,
      userPrenom,
      userNoisettes,
      userId,
      userType
    }
  },
  methods :{
    goTo(link, params){

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
    disconnect(){
      this.authStore.deconnexion();
      this.$router.push('/auth');
    }
  },
  computed: {
    uppercaseFirstLetterName: function () {
      return this.userPrenom.charAt(0).toUpperCase();
    },
    getFirstAndLastName : function () {
      return this.userPrenom + ' ' + this.userNom;
    },
    getColorFromUserName : function () {
      let hash = 0;
      if(this.userPrenom){
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
}
</script>

<style scoped>
  #nomUtilisateur{
    display: block;
    font-size: 1em;
    font-weight: bold;
  }

  #pointsNoisette{
    display: block;
    font-size: 0.75em;
  }
</style>