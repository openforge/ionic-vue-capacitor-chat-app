/* eslint-disable vue/require-v-for-key */
<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <!-- <div class="chat-bubble">
        <p class="author">Claudio</p>
        <p class="body">Hello, this is a message.</p>
      </div> -->
      <div class="chat-bubble receiver">
        <p class="body"></p>
      </div>
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
import { computed, defineComponent, inject } from "vue";
import { useRoute } from "vue-router";
import { ChatProvider, Chat } from "@/providers/chats-provider";
import { chatCollection } from '../firebase';

export default defineComponent({
  name: "Chat",
  components: {
    IonContent,
    IonPage,
    IonFooter,
    IonInput,
    IonButton,
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const chatStore = inject<ChatProvider>("userStore");
    const chat = computed(() => chatStore?.state);

    chatCollection.doc(id as string).get().then(ref => {
      if (!ref.exists || !chatStore) {
        // TODO: if id doeesn't match any chats redirect to home or auth
        console.warn("Chat doesn't exist");
        return;
      }
      const chat = ref.data() as Chat;
      chatStore?.setChat(chat);
    })

    return { send, chat };
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