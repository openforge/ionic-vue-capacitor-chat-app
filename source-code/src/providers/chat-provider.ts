import { computed, ComputedRef, reactive, readonly } from 'vue';
import { User } from './user-provider';

interface Message {
  body: string;
  sender: User;
  coords?: {
    latitude: number;
    longitude: number;
  };
}

export interface Chat {
  id: string;
  createdByID: string;
  messages: Message[];
}

export interface ChatProvider {
  state: {
    id: string;
    createdByID: string;
    messages: {
      body: string;
      sender: {
        id: string;
        name: string;
      };
      coords?: {
        latitude: number;
        longitude: number;
      };
    }[];
  };
  setChat: (chat: Chat) => void;
  id: ComputedRef<string>;
  messages: ComputedRef<Message>[];
}

const state = reactive<Chat>({
  id: '',
  createdByID: '',
  messages: [],
});

const setChat = (chat: Chat) => {
  Object.assign(state, chat);
};

const id = computed(() => state.id);
const messages = computed(() => state.messages);

export const chatStore = readonly({
  state,
  setChat,
  id,
  messages,
});
