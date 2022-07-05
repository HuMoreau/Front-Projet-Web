<template>
  <div id="content" class="grid">
    <div class="col-6 grid align-content-start">
      <HelloDisplayer id="hello_displayer" class="col-12"></HelloDisplayer>
      <SelectedTicketDisplayer id="selected_ticket_displayer" class="col-12"/>
      <FreeTicketsDisplayer id="free_tickets_displayer" class="col-12"/>
    </div>
    <div class="col-6 grid align-content-start">
      <InfoDevDisplayer class="col-12"></InfoDevDisplayer>
      <ProjectsStateDisplayer id="etat_projet_displayer" class="col-12"/>
    </div>
  </div>
</template>

<script>
import FreeTicketsDisplayer from "@/components/HomePage/Displayers/FreeTicketsDisplayer";
import InfoDevDisplayer from "@/components/HomePage/Displayers/InfoDevDisplayer";
import ProjectsStateDisplayer from "@/components/HomePage/Displayers/ProjectsStateDisplayer";
import SelectedTicketDisplayer from "@/components/HomePage/Displayers/SelectedTicketDisplayer";
import HelloDisplayer from "@/components/HomePage/Displayers/HelloDisplayer";

export default {
  name: "HomePageRapporteur",
  components : {
    HelloDisplayer,
    FreeTicketsDisplayer,
    InfoDevDisplayer,
    ProjectsStateDisplayer,
    SelectedTicketDisplayer,
  }
}
</script>

<style scoped>
</style>