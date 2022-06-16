<template>
  <div class="flex flex-row justify-content-center align-items-center">
    <AvatarIcon icon="pi pi-user" class="mr-2" shape="circle" />
    <div class="flex flex-column justify-content-center align-items-center mr-2">
      <label id="nomUtilisateur" class="mb-0">Utilisateur 1</label>
      <div class="flex flex-row justify-content-center align-items-center">
        <label id="pointsNoisette" class="mr-1">100</label>
        <img alt="logo" src="./../../assets/noisette.png" height="15">
      </div>
    </div>
    <PrimeButton icon="pi pi-cog" class="p-button-rounded p-button-secondary p-button-text" />
    <PrimeButton icon="pi pi-sign-out" class="p-button-rounded p-button-text" />
  </div>
</template>

<script>
export default {
  name: "UserHeadbarInfo"
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