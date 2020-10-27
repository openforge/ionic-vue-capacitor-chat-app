import { computed, ComputedRef, reactive, readonly } from 'vue';
import { User } from './user-provider';

export interface Chat {
    id: string;
    createdByID: string;
    messages: {
        body: string;
        sender: User;
    }[];
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
        }[];
    };
    setChat: (chat: Chat) => void;
    messages: ComputedRef<{
        body: string;
        sender: {
            id: string;
            name: string;
        };
    }[]>;
}

const state = reactive<Chat>({
    id: '',
    createdByID: '',
    messages: [],
});

const setChat = (chat: Chat) => {
    Object.assign(state, chat);
};

const messages = computed(() => state.messages);

export const chatStore = readonly({
    state,
    setChat,
    messages,
})