<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Utilisateurs</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus"
        @click="goTo('/users/new')"/>
        <div class="utility-buttons flex align-items-center">
          <SelectButton class="mr-2" v-model="typeToDisplay" :options="typeOptions" dataKey="value">
            <template #option="slotProps">
              <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
          <InputText placeholder="Rechercher" type="text" class="ml-auto" v-model="recherche" :disabled="!utilisateurs"/>
        </div>
      </div>
      <div v-if="utilisateurs" class="p-panel-content no-padding max-min-h-90vh">
        <VisuelUser v-for="utilisateur in this.utilisateursToDisplay" :key="utilisateur.id + '-' + utilisateur.type"
                    :user-to-display="utilisateur" @deleteMe="deleteUser($event)"/>
      </div>
      <div v-else class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Il n'y a aucun utilisateur ! (Mais comment vous êtes-vous connecté ?)</label>
          <PrimeButton label="CRÉER UTILISATEUR" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
        </div>
      </div>
    </div>

    <!--  Modal de suppression  -->
    <UserDeleteModal @closeMe="closeDeleteModal" :displayed="isDeletionModalDisplayed" :user-to-display="userToDelete"/>
  </div>
</template>

<script>
import VisuelUser from "@/components/Users/ListAll/VisuelUser";
import UserDeleteModal from "@/components/Users/DeleteOne/UserDeleteModal";
import {apiService} from "@/main";
export default {
  name: "UsersList",
  components: {UserDeleteModal, VisuelUser},
  data() {
    return {
      typeToDisplay : {icon: 'pi pi-users', value: 'EVERYBODY'},
      recherche : null,
      isDeletionModalDisplayed : false,
      userToDelete : null,
      utilisateurs : [],
      typeOptions: [
        {icon: 'pi pi-users', value: 'EVERYBODY'},
        {icon: 'pi pi-desktop', value: 'DEV'},
        {icon: 'pi pi-phone', value: 'RAP'}
      ]
    }
  },
  mounted() {
    // api call to get all users
    this.populate();
  },
  methods: {
    populate() {
      apiService.get('utils/users').then(response => {
        this.utilisateurs = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    deleteUser(event){
      this.userToDelete = event;
      this.isDeletionModalDisplayed = true;
    },
    closeDeleteModal(){
      this.userToDelete = null;
      this.isDeletionModalDisplayed = false;
    },
    goTo(link, params){

      if(params){
        this.$router.push({path: link, query: params});
        return;
      }
      this.$router.push(link);
    }
  },
  computed: {
    utilisateursToDisplay : function (){
      let result = this.utilisateurs;
      if(this.typeToDisplay.value !== 'EVERYBODY'){
        result = result.filter(user => user.type === this.typeToDisplay.value)
      }
      if(this.recherche){
         result = result.filter(user =>
             user.prenom.toLowerCase().includes(this.recherche.toLowerCase())
             || user.nom.toLowerCase().includes(this.recherche.toLowerCase()))
      }
      return result;
    },
  }
}
</script>

<style scoped>
.utility-buttons{
  margin-left: auto;
}
</style>