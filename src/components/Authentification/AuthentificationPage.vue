<template>
  <div class="flex flex-column p-component align-items-center">
    <div class="flex align-items-center mt-7">
      <img alt="logo" src="./../../assets/logo-mini.png" height="150" class="mr-2"/>
      <label class="titre">TicketTac</label>
    </div>
    <div class="flex flex-column authentification-div mt-6 p-3 border-2">
      <div class="mb-3 align-self-center">
        <label class="titre-authent">Authentification</label>
      </div>
      <div class="flex flex-column mb-2">
        <label class="mb-1">Mail</label>
        <InputText v-model="email" placeholder="mail@mail.mail"/>
      </div>
      <div class="flex flex-column mb-3">
        <label class="mb-1">Mot de passe</label>
        <PassWord v-model="mdp" placeholder="Mot de passe" :feedback="false" toggleMask/>
      </div>
      <label v-if="errorMessage" class="p-error mb-3 p-3">{{errorMessage}}</label>
      <div class="flex flex-column mb-2">
        <PrimeButton label="Connexion" @click="checkForAuth()"></PrimeButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthentificationPage",
  data(){
    return {
      submitted : false,
      email : null,
      mdp : null,
      errorMessage : null,
    }
  },
  methods : {
    checkForAuth(){
      this.errorMessage = "Il y a une erreur palsanbleu !"
    }
  }
}
</script>

<style scoped>
  .authentification-div{
    background-color: #f8f9fa;
    border-color: #dee2e6;
    border-radius: 15px;
  }

  .titre{
    display: block;
    font-size: 8em;
    font-weight: bold;
    color: #495057;
    cursor: pointer;
  }

  .titre-authent{
    font-size: 1.5em;
    font-weight: bold;
    color: #495057;
    cursor: pointer;
  }

  .p-error{
    border-radius: 15px;
    background-color : lightpink;
    border: 1px solid lightcoral;
  }
</style>