<template>
  <MenuBar :model="items">
    <template #start>
      <router-link to="/">
        <div class="flex flex-row justify-content-center align-items-center mr-2">
          <img alt="logo" src="./../../assets/logo-mini.png" height="40" class="mr-2">
          <label id="titreLogo">TicketTac</label>
        </div>
      </router-link>
    </template>
    <template #end>
      <UserHeadbarInfo/>
    </template>
  </MenuBar>
</template>

<script>
import UserHeadbarInfo from "@/components/HeadBar/UserHeadbarInfo";
export default {
  name: "HeadBar",
  components: {UserHeadbarInfo},
  data() {
    return {
      items: [
        {
          label:'Tickets',
          icon:'pi pi-fw pi-ticket',
          items:[
            {
              label:'Voir',
              icon:'pi pi-fw pi-eye',
            },
            {
              label:'Nouveau',
              icon:'pi pi-fw pi-plus',
            }
          ]
        },
        {
          label:'Gérer',
          icon:'pi pi-fw pi-briefcase',
          items:[
            {
              label:'Projets',
              icon:'pi pi-fw pi-bookmark',
              items:[
                {
                  label:'Voir',
                  icon:'pi pi-fw pi-eye',
                },
                {
                  label:'Nouveau',
                  icon:'pi pi-fw pi-plus',
                }
              ]
            },
            {
              label:'Clients',
              icon:'pi pi-fw pi-id-card',
              items:[
                {
                  label:'Voir',
                  icon:'pi pi-fw pi-eye',
                },
                {
                  label:'Nouveau',
                  icon:'pi pi-fw pi-plus',
                }
              ]
            },
            {
              label:'Utilisateurs',
              icon:'pi pi-fw pi-users',
              items:[
                {
                  label:'Voir',
                  icon:'pi pi-fw pi-eye',
                  to: '/users'
                },
                {
                  label:'Nouveau',
                  icon:'pi pi-fw pi-plus',
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
#titreLogo{
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  color: #495057;
  cursor: pointer;
}
</style>