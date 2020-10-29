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
      <ion-input v-model="message" />
      <ion-button @click="onSend" fill="clear">
        <ion-icon :icon="send"></ion-icon>
      </ion-button>
      <ion-button @click="onLocate" fill="clear">
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
import { computed, defineComponent, inject, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { ChatProvider } from "@/providers/chat-provider";
import { UserProvider } from "@/providers/user-provider";
import { useChat } from "../composables/useChat";

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
    const { sendMessage, sendLocation } = useChat(id as string);
    const uid = computed(() => userStore?.state.id);
    const chat = computed(() => chatStore?.state);

    const onSend = () =>
      sendMessage(state.message).then(() => (state.message = ""));
    const onLocate = () =>
      sendLocation(state.message).then(() => (state.message = ""));

    return {
      send,
      location,
      chat,
      uid,
      ...toRefs(state),
      onSend,
      onLocate,
    };
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