<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, provide } from "vue";
import { chatStore } from "./providers/chats-provider";
import { userStore } from "./providers/user-provider";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    provide("userStore", userStore);
    provide("chatStore", chatStore);
  },
});
</script>