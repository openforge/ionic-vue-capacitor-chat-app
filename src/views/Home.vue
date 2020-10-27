<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <div class="container">
        <h1>Enter Name</h1>
        <ion-input />
        <ion-button class="ion-margin" color="light" expand="block"><b>login</b></ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
  },
  setup() {
    const user = '';
  }
});
</script>

<style scoped>
.container {
  margin: auto;
  margin-top: 25%;
  width: 75%;
}
ion-input {
  --background: var(--ion-color-light);
  border-radius: 20px;
  margin: auto;
}
</style>