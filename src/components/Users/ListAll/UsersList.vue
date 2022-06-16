<template>
  <div id="content" class="grid">
    <div class="p-component p-panel col-12">
      <div class="p-panel-header flex align-items-center">
        <label class="p-panel-title mr-2">Utilisateurs</label>
        <PrimeButton label="Nouveau" class="p-button-outlined p-button-sm p-button-rounded" icon="pi pi-plus" />
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
        <VisuelUser v-for="utilisateur in this.utilisateursToDisplay" :key="utilisateur.id" :user-to-display="utilisateur"/>
      </div>
      <div v-else class="p-panel-content no-padding border-bottom">
        <div class="flex flex-column justify-content-center align-items-center p-3">
          <label class="mb-2">Il n'y a aucun utilisateur ! (Mais comment vous êtes-vous connecté ?)</label>
          <PrimeButton label="CRÉER UTILISATEUR" class="p-button-rounded" icon="pi pi-chevron-right" iconPos="right"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VisuelUser from "@/components/Users/ListAll/VisuelUser";
export default {
  name: "UsersList",
  components: {VisuelUser},
  data() {
    return {
      typeToDisplay : {icon: 'pi pi-users', value: 'EVERYBODY'},
      recherche : null,
      utilisateurs : [
        {id: 1, type:'DEV', name:'Louison Armand', profilPicture: null, noisettes: 1254},
        {id: 2, type:'DEV', name:'Flavien Perrineau', profilPicture: null, noisettes: 1254},
        {id: 3, type:'RAP', name:'Théophane Lumineau', profilPicture: null, noisettes: null},
        {id: 4, type:'DEV', name:'Guillaume Conchon', profilPicture: null, noisettes: 1254},
        {id: 5, type:'RAP', name:'Bertrand Stailquy', profilPicture: null, noisettes: null},
        {id: 6, type:'DEV', name:'Michael Delaporte', profilPicture: null, noisettes: 1254},
      ],
      typeOptions: [
        {icon: 'pi pi-users', value: 'EVERYBODY'},
        {icon: 'pi pi-desktop', value: 'DEV'},
        {icon: 'pi pi-phone', value: 'RAP'}
      ]
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
             user.name.toLowerCase().includes(this.recherche.toLowerCase()))
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