<template>
  <div>
    <HomePageDeveloppeur v-if="isUserDev"/>
    <HomePageRapporteur v-if="isUserRap"/>
    <PrimeToast />
  </div>
</template>

<script>
import HomePageDeveloppeur from "@/components/HomePage/HomePageDeveloppeur";
import HomePageRapporteur from "@/components/HomePage/HomePageRapporteur";
import {useAuthStore} from "@/store/authStore";

export default {
  name: "HomePage",
  components : {
    HomePageRapporteur,
    HomePageDeveloppeur
  },
  setup() {
    const authStore = useAuthStore();
    const {isUserDev, isUserRap} = authStore;
    return {
      isUserDev,
      isUserRap
    }
  }
}
</script>

<style scoped>
</style>