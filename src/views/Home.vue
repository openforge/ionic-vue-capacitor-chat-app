<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <h1>Welcome {{ name }}</h1>
      <ion-button
        class="ion-margin"
        color="success"
        @click.prevent="createChat()"
        >new chat</ion-button
      >
      <ion-list v-if="chatIDs">
        <ion-item @click.prevent="router.push(`/chat/${id}`)" v-for="(id, i) in chatIDs" :key="i">
          {{ id }}
        </ion-item>
      </ion-list>
      <ion-button class="ion-margin" color="warning" @click.prevent="logout()"
        >logout</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { IonContent, IonPage, IonList, IonItem, IonButton } from "@ionic/vue";
import { UserProvider } from "@/providers/user-provider";
import { Chat } from "@/providers/chats-provider";
import { chatCollection, auth } from "../firebase";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  components: { IonPage, IonContent, IonList, IonItem, IonButton },
  setup() {
    const userStore = inject<UserProvider>("userStore");
    const name = computed(() => userStore?.name);
    const chatIDs = computed(() => userStore?.chatIDs);
    const router = useRouter();

    async function createChat() {
      const chat: Partial<Chat> = {
        createdByID: userStore?.state.id,
        messages: [],
      };
      const ref = await chatCollection.add(chat);
      await ref.set({ id: ref.id }, { merge: true });
    }

    function logout() {
      auth.signOut().then(() => router.push("/auth"));
    }

    return { name, createChat, logout, chatIDs, router };
  },
});
</script>