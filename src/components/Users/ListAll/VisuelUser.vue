<template>
  <div class="line-in-list flex align-items-center">
    <AvatarIcon v-if="userToDisplay.profilePicture"
                :image="userToDisplay.profilePicture"
                class="mr-2" shape="circle" />
    <AvatarIcon v-else :label="uppercaseFirstLetterName"
                class="mr-2" shape="circle"
                :style="'background-color:' + getColorFromUserName + ';color : #fff'"/>
    <label>{{getFirstAndLastName}}</label>
    <span class="importance-badge user-type flex align-items-center mb-0 mr-3">
      <i v-if="userToDisplay.type === 'RAP' " class="pi pi-phone mr-1"></i>
      <i v-if="userToDisplay.type === 'DEV' " class="pi pi-desktop mr-1"></i>
      {{userToDisplay.type}}
    </span>
    <small>{{userToDisplay.email}}</small>
    <div id="go_to_buttons">
      <PrimeButton icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-button-sm p-button-text"
                   @click="goTo(`/users/${userToDisplay.type}/${userToDisplay.id}`, {mod : true})"/>
      <PrimeButton icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm p-button-text"
                   @click="deleteMe"/>
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text"
                   @click="goTo(`/users/${userToDisplay.type}/${userToDisplay.id}`)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelUser",
  props : {
    userToDisplay : Object,
  },
  methods: {
    goTo(link, params){

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    },
    deleteMe(){
      this.$emit('deleteMe', this.userToDisplay);
    }
  },
  computed: {
    uppercaseFirstLetterName: function () {
      return this.userToDisplay.prenom.charAt(0).toUpperCase();
    },
    getFirstAndLastName : function () {
      return this.userToDisplay.prenom + ' ' + this.userToDisplay.nom;
    },
    getColorFromUserName : function () {
      let hash = 0;
      if(this.userToDisplay.prenom){
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
  .utilisateur{
    border-bottom: 1px solid #dee2e6;
    padding: 10px
  }
  #go_to_buttons{
    margin-left: auto;
  }
</style>