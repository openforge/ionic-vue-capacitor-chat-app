<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="chat-bubble">Hello, this is a message.</div>
      <div class="chat-bubble sender">Hi! this is another message.</div>
    </ion-content>
    <ion-footer class="ion-padding">
      <ion-input />
      <ion-button fill="clear">
        <ion-icon :icon="send"></ion-icon>
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { send } from "ionicons/icons";
import {
  IonContent,
  IonPage,
  IonFooter,
  IonInput,
  IonButton,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonFooter,
    IonInput,
    IonButton,
  },
  setup() {
    return { send };
  },
});
</script>

<style scoped>
ion-footer {
  background: var(--ion-color-medium);
  display: flex;
  height: 8%;
  align-items: center;
}
ion-input {
  --background: var(--ion-color-medium-contrast);
  border-radius: 20px;
  --padding-start: 15px;
}
.chat-bubble {
  background: gainsboro;
  max-width: 75%;
  width: max-content;
  border-radius: 15px;
  padding: 10px;
  margin-top: 20px;
}
.sender {
  background: lightblue;
  margin-left: auto;
}
</style>