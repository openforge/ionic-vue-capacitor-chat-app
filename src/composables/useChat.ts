import { chatCollection } from '@/firebase';
import { ChatProvider, Chat } from '@/providers/chat-provider';
import { UserProvider } from '@/providers/user-provider';
import { firestore } from 'firebase';
import { inject, watchEffect } from 'vue';

export function useChat(id: string) {
  const chatStore = inject<ChatProvider>('chatStore');
  const userStore = inject<UserProvider>('userStore');

  watchEffect(() => {
    id &&
      chatCollection.doc(id).onSnapshot((snap) => {
        const chat = snap.data() as Chat;
        chatStore?.setChat(chat);
      });
  });

  const sendMessage = async (body: string) => {
    const message = {
      body,
      sender: {
        name: userStore?.name,
        id: userStore?.id,
      },
    };
    await chatCollection.doc(chatStore?.id.value).set(
      {
        messages: firestore.FieldValue.arrayUnion(message),
      },
      { merge: true }
    );
  };
}
