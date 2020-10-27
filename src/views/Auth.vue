<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <div class="container ion-padding">
        <h1>Vue Chat</h1>

        <ion-input placeholder="Name" v-model="name" />
        <ion-input type="email" placeholder="Email" v-model="email" />
        <ion-input type="password" placeholder="Password" v-model="password" />

        <ion-text color="danger" v-if="error">{{error}}</ion-text>

        <ion-button
          @click.prevent="logIn()"
          class="ion-margin"
          color="light"
          expand="block"
          >login</ion-button
        >
        <ion-button
          @click.prevent="signUp()"
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
import { auth as Auth } from "firebase";
import { defineComponent, reactive, toRefs } from "vue";
import { auth, userCollection } from "../firebase";

export default defineComponent({
  name: "Auth",
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonText
  },
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      password: "",
      error: "",
    });

    function updateUser(auth: Auth.UserCredential) {
      if (!auth.user) return;

      const {
        user: { uid },
      } = auth;

      const user = {
        id: uid,
        name: formData.name,
      };

      userCollection.doc(uid).set(user);
    }

    function logIn() {
      return auth
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(updateUser)
        .catch(e => {
          console.warn(e);
          formData.error = "User does not exist"
        });
    }

    function signUp() {
      return auth
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(updateUser)
        .catch(e => {
          console.warn(e);
          formData.error = "User already exists"
        });
    }

    return { ...toRefs(formData), logIn, signUp };
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