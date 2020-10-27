<template>
  <ion-page>
      <ion-content :fullscreen="true" class="ion-padding ion-text-center">
          <h1>Welcom User</h1>
      </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
export default defineComponent({
  name: "Home",
  components: { IonPage, IonContent },
});
</script>