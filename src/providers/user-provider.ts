import { computed, ComputedRef, reactive, readonly } from 'vue';

export interface User {
  id: string;
  name: string;
  chatIDs: string[];
}

export interface UserProvider {
  state: {
    id: string;
    name: string;
    chatIDs: string[];
  };
  setUser: (user: User) => void;
  addChatID: (id: string) => void;
  name: ComputedRef<string>;
  chatIDs: ComputedRef<string[]>;
}

const state = reactive<User>({
  id: '',
  name: '',
  chatIDs: [],
});

const setUser = (user: User) => {
  Object.assign(state, user);
};

const setChatIDs = (ids: string[]) => {
  state.chatIDs = ids;
}

const name = computed(() => state.name);
const chatIDs = computed(() => state.chatIDs);

export const userStore = readonly({
  state,
  setUser,
  setChatIDs,
  name,
  chatIDs,
});
