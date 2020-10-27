<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <h1>Welcome {{ name }}</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import { UserProvider } from "@/providers/user-provider";

export default defineComponent({
  name: "Home",
  components: { IonPage, IonContent },
  setup() {
    const userStore = inject<UserProvider>("userStore");
    const name = computed(() => userStore?.name);

    return { name };
  },
});
</script>