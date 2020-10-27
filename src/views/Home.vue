<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <h1>Welcome {{ name }}</h1>
      <ion-button
        class="ion-margin"
        color="success"
        @click.prevent="createChat()"
        >Add New Chat</ion-button
      >
      <ion-list>
        <ion-item></ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { IonContent, IonPage, IonList, IonItem } from "@ionic/vue";
import { UserProvider } from "@/providers/user-provider";
import { chatCollection } from "../firebase";
export default defineComponent({
  name: "Home",
  components: { IonPage, IonContent, IonList, IonItem },
  setup() {
    const userStore = inject<UserProvider>("userStore");
    const name = computed(() => userStore?.name);
    const chatIDs = computed(() => userStore?.chatIDs);

    function createChat() {
      chatCollection.add({ messages: [] }).then((ref) => {
        ref.set({ id: ref.id }, { merge: true });
      });
    }

    return { name, createChat, chatIDs };
  },
});
</script>