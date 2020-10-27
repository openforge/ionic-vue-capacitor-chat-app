/* eslint-disable vue/require-v-for-key */
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="chat && uid" class="container">
        <div
          :key="i"
          v-for="(message, i) in chat.messages"
          v-bind:class="{ receiver: message.sender.id === uid }"
          class="chat-bubble"
        >
          <p v-if="message.sender.id !== uid" class="author">
            {{ message.sender.name }}
          </p>
          <p class="body">{{ message.body }}</p>
        </div>
      </div>
    </ion-content>
    <ion-footer class="ion-padding">
      <ion-input v-model="state.message" />
      <ion-button @click="sendMessage()" fill="clear">
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
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { computed, defineComponent, inject, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChatProvider, Chat } from "@/providers/chats-provider";
import { chatCollection } from "../firebase";
import { UserProvider } from "@/providers/user-provider";
import { firestore } from "firebase";

export default defineComponent({
  name: "Chat",
  components: {
    IonContent,
    IonPage,
    IonFooter,
    IonInput,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const state = reactive({
      message: "",
    });
    const chatStore = inject<ChatProvider>("chatStore");
    const userStore = inject<UserProvider>("userStore");
    const router = useRouter();
    const uid = computed(() => userStore?.state.id);
    const chat = computed(() => chatStore?.state);

    watchEffect(() => {
      if (userStore && !userStore.state.id) {
        router.push("/auth");
      }
      if (chat?.value?.id) {
        chatCollection.doc(chat?.value.id).onSnapshot((snap) => {
          const chat = snap.data() as Chat;
          chatStore?.setChat(chat);
        });
      }
    });

    async function sendMessage() {
      if (!chat?.value) return;

      await chatCollection.doc(chat.value.id).set(
        {
          messages: firestore.FieldValue.arrayUnion({
            body: state.message,
            sender: {
              name: userStore?.state.name,
              id: userStore?.state.id,
            },
          }),
        },
        { merge: true }
      );
      state.message = "";
    }

    chatCollection
      .doc(id as string)
      .get()
      .then((ref) => {
        if (!ref.exists || !chatStore) {
          // TODO: if id doeesn't match any chats redirect to home or auth
          console.warn("Chat doesn't exist");
          return;
        }
        const chat = ref.data() as Chat;
        chatStore?.setChat(chat);
      });

    return { send, chat, uid, state, sendMessage };
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
ion-icon {
  color: var(--ion-color-medium-contrast);
  margin-left: 10px;
}
.chat-bubble {
  margin-top: 20px;
}
.author {
  color: var(--ion-color-medium);
  margin: 4px 10px;
}
.body {
  background: gainsboro;
  max-width: 75%;
  width: max-content;
  border-radius: 15px;
  padding: 10px;
  margin: 0;
}

.receiver > p {
  background: lightblue;
  margin-left: auto;
}
</style>