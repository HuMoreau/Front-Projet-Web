<template>
  <div id="content" class="grid">
    <div class="col-6 grid align-content-start">
      <HelloDisplayer id="hello_displayer" class="col-12"></HelloDisplayer>
      <SelectedTicketDisplayerRap id="selected_ticket_displayer" class="col-12"/>
      <clients-state-displayer id="etat_client_displayer" class="col-12"/>
    </div>
    <div class="col-6 grid align-content-start">
      <InfoRapDisplayer class="col-12"></InfoRapDisplayer>
      <FinishedTicketDisplayerRap id="selected_ticket_displayer" class="col-12"/>
    </div>
  </div>
</template>

<script>
import HelloDisplayer from "@/components/HomePage/Displayers/HelloDisplayer";
import InfoRapDisplayer from "@/components/HomePage/Displayers/InfoRapDisplayer";
import SelectedTicketDisplayerRap from "@/components/HomePage/Displayers/SelectedTicketDisplayerRap";
import ClientsStateDisplayer from "@/components/HomePage/Displayers/ClientsStateDisplayer";
import FinishedTicketDisplayerRap from "@/components/HomePage/Displayers/FinishedTicketDisplayerRap";

export default {
  name: "HomePageRapporteur",
  components : {
    FinishedTicketDisplayerRap,
    ClientsStateDisplayer,
    HelloDisplayer,
    InfoRapDisplayer,
    SelectedTicketDisplayerRap
  }
}
</script>

<style scoped>
</style>