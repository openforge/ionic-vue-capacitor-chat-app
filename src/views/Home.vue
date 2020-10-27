<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <div class="container ion-padding">
        <h1>Vue Chat</h1>

        <ion-input placeholder="Name" v-model="name" />
        <ion-input type="email" placeholder="Email" v-model="email" />
        <ion-input type="password" placeholder="Password" v-model="password" />

        <ion-button
          @click.prevent="login()"
          class="ion-margin"
          color="light"
          expand="block"
          >login</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton } from "@ionic/vue";
import { defineComponent, reactive, toRefs } from "vue";
import { auth } from "../firebase";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
  },
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      password: "",
    });
    function login() {
      return auth.signInWithEmailAndPassword(formData.email, formData.password);
    }
    return { ...toRefs(formData), login };
  },
});
</script>

<style scoped>
.container {
  margin-top: 25%;
}
ion-input {
  --background: var(--ion-color-light);
  border-radius: 20px;
  font-weight: bold;
  margin: 20px auto;
}
ion-button {
  font-weight: bold;
}
</style>