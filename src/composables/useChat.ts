import { chatCollection } from '@/firebase';
import { ChatProvider, Chat } from '@/providers/chat-provider';
import { UserProvider } from '@/providers/user-provider';
import { firestore } from 'firebase';
import { inject, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useGeolocation } from './useGeolocation';

export function useChat(id: string) {
  const chatStore = inject<ChatProvider>('chatStore');
  const userStore = inject<UserProvider>('userStore');
  const { getCurrentPosition } = useGeolocation();
  const router = useRouter();

  watchEffect(() => {
    id &&
      chatCollection.doc(id).onSnapshot((snap) => {
        if (!snap.exists) {
          router.push('/home');
          return;
        }
        const chat = snap.data() as Chat;
        chatStore?.setChat(chat);
      });
  });

  const sendMessage = async (
    body: string,
    coords?: { latitude: number; longitude: number }
  ) => {
    const message = {
      body,
      sender: {
        name: userStore?.name,
        id: userStore?.id,
      },
    };
    if (coords) {
      Object.assign(message, { ...message, coords });
    }
    await chatCollection.doc(id).set(
      {
        messages: firestore.FieldValue.arrayUnion(message),
      },
      { merge: true }
    );
  };

  async function sendLocation(body = '') {
    const {
      coords: { latitude, longitude },
    } = await getCurrentPosition();
    const coords = { latitude, longitude };
    sendMessage(body, coords);
  }

  return { sendMessage, sendLocation };
}
