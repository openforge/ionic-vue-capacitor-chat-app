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
        <ion-item
          @click.prevent="router.push(`/chat/${id}`)"
          v-for="(id, i) in chatIDs"
          :key="i"
        >
          {{ id }}
          <ion-button
            slot="end"
            @click.stop="copyLink(`${baseURL}/chat/${id}`)"
            >share</ion-button
          >
          <ion-button
            slot="end"
            @click.stop="deleteChat(id, $event)"
            color="danger"
            >delete</ion-button
          >
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
import { Chat } from "@/providers/chat-provider";
import { chatCollection } from "../firebase";
import { useRouter } from "vue-router";
import { useAuthentication } from "@/composables/useAuthentication";
import { useClipboard } from '@/composables/useClipboard';
export default defineComponent({
  name: "Home",
  components: { IonPage, IonContent, IonList, IonItem, IonButton },
  setup() {
    const userStore = inject<UserProvider>("userStore");
    const { logout } = useAuthentication();
    const { copyLink } = useClipboard();
    const name = computed(() => userStore?.name);
    const chatIDs = computed(() => userStore?.chatIDs);
    const router = useRouter();
    const baseURL = window.location.origin;

    async function createChat() {
      const chat: Partial<Chat> = {
        createdByID: userStore?.state.id,
        messages: [],
      };
      const ref = await chatCollection.add(chat);
      await ref.set({ id: ref.id }, { merge: true });
    }

    async function deleteChat(id: string, e: Event) {
      e.stopPropagation();
      return await chatCollection.doc(id).delete();
    }

    return { name, createChat, deleteChat, logout, chatIDs, router, copyLink, baseURL};
  },
});
</script>