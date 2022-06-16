<template>
  <div class="utilisateur flex align-items-center">
    <AvatarIcon v-if="userToDisplay.profilePicture"
                :image="userToDisplay.profilePicture"
                class="mr-2" shape="circle" />
    <AvatarIcon v-else :label="uppercaseFirstLetterName"
                class="mr-2" shape="circle"
                :style="'background-color:' + getColorFromUserName + ';color : #fff'"/>
    <label>{{userToDisplay.name}}</label>
    <span class="importance-badge user-type flex align-items-center mb-0">
      <i v-if="userToDisplay.type === 'RAP' " class="pi pi-phone mr-1"></i>
      <i v-if="userToDisplay.type === 'DEV' " class="pi pi-desktop mr-1"></i>
      {{userToDisplay.type}}
    </span>
    <div id="go_to_buttons">
      <PrimeButton icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-button-sm p-button-text" />
      <PrimeButton icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm p-button-text" />
      <PrimeButton icon="pi pi-chevron-right" class="p-button-rounded p-button-sm p-button-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VisuelUser",
  props : {
      userToDisplay : Object,
  },
  computed: {
    uppercaseFirstLetterName: function () {
      return this.userToDisplay.name.charAt(0).toUpperCase();
    },
    getColorFromUserName : function () {
      let hash = 0;
      for (let i = 0; i < this.userToDisplay.name.length; i++) {
        hash = this.userToDisplay.name.charCodeAt(i) + ((hash << 5) - hash);
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
  .utilisateur{
    border-bottom: 1px solid #dee2e6;
    padding: 10px
  }
  #go_to_buttons{
    margin-left: auto;
  }
</style>