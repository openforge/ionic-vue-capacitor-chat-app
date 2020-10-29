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
          <p class="body">
            {{ message.body }}
            <a
              v-if="message.coords"
              v-bind:href="`https://www.google.com/maps/@${message.coords.latitude},${message.coords.longitude},16z`"
              >See location on map</a
            >
          </p>
        </div>
      </div>
    </ion-content>
    <ion-footer class="ion-padding">
      <ion-input v-model="state.message" />
      <ion-button @click="sendMessage()" fill="clear">
        <ion-icon :icon="send"></ion-icon>
      </ion-button>
      <ion-button @click="sendLocation()" fill="clear">
        <ion-icon :icon="location"></ion-icon>
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { send, location } from "ionicons/icons";
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
import { ChatProvider, Chat } from "@/providers/chat-provider";
import { chatCollection } from "../firebase";
import { UserProvider } from "@/providers/user-provider";
import { firestore } from "firebase";
import { useGeolocation } from "../composables/useGeolocation";

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
    const { getCurrentPosition } = useGeolocation();
    const router = useRouter();
    const uid = computed(() => userStore?.state.id);
    const chat = computed(() => chatStore?.state);

    watchEffect(() => {
      if (chat?.value?.id) {
        chatCollection.doc(chat?.value.id).onSnapshot((snap) => {
          const chat = snap.data() as Chat;
          chatStore?.setChat(chat);
        });
      }
    });

    async function sendMessage(coords?: {
      latitude: number;
      longitude: number;
    }) {
      if (!chat?.value) return;

      const message = coords
        ? {
            body: state.message,
            sender: {
              name: userStore?.state.name,
              id: userStore?.state.id,
            },
            coords,
          }
        : {
            body: state.message,
            sender: {
              name: userStore?.state.name,
              id: userStore?.state.id,
            },
          };

      await chatCollection.doc(chat.value.id).set(
        {
          messages: firestore.FieldValue.arrayUnion(message),
        },
        { merge: true }
      );
      state.message = "";
    }

    async function sendLocation() {
      const {
        coords: { latitude, longitude },
      } = await getCurrentPosition();
      const coords = { latitude, longitude };
      sendMessage(coords);
    }

    chatCollection
      .doc(id as string)
      .get()
      .then((ref) => {
        if (!ref.exists) {
          router.push("/home");
          return;
        }
        const chat = ref.data() as Chat;
        chatStore?.setChat(chat);
      });

    return { send, location, chat, uid, state, sendMessage, sendLocation };
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