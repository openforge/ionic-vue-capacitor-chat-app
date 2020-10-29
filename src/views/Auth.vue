<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <img
        src="https://openforge.io/wp-content/uploads/2020/02/openforge-logo-1-1.png"
      />
      <div class="container ion-padding">
        <h1>Vue Chat</h1>

        <ion-input placeholder="Name" v-model="formData.name" />
        <ion-input type="email" placeholder="Email" v-model="formData.email" />
        <ion-input type="password" placeholder="Password" v-model="formData.password" />

        <ion-text color="danger" v-if="formData.error">{{ formData.error }}</ion-text>

        <ion-button
          @click.prevent="login()"
          class="ion-margin"
          color="light"
          expand="block"
          >login</ion-button
        >
        <ion-button
          @click.prevent="signup()"
          class="ion-margin"
          color="medium"
          expand="block"
          >signup</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton, IonText } from "@ionic/vue";
import { defineComponent, reactive } from "vue";
import { useAuthentication } from "../composables/useAuthentication";

export default defineComponent({
  name: "Auth",
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonText,
  },
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      password: "",
      error: "",
    });
    const { loginWithEmail, signupWithEmail } = useAuthentication();
    const login = () =>
      loginWithEmail(formData.name, formData.email, formData.password).catch(
        (e) => (formData.error = e)
      );
    const signup = () =>
      signupWithEmail(formData.name, formData.email, formData.password).catch(
        (e) => (formData.error = e)
      );

    return { formData, login, signup };
  },
});
</script>

<style scoped>
.container {
  margin-top: 10%;
}
img {
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