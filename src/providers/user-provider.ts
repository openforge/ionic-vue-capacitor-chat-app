import { computed, ComputedRef, reactive, readonly } from 'vue';

export interface User {
  id: string;
  name: string;
}

export interface UserProvider {
  state: {
    id: string;
    name: string;
  };
  setUser: (user: User) => void;
  name: ComputedRef<string>;
}

const state = reactive<User>({
  id: '',
  name: '',
});

const setUser = (user: User) => {
  Object.assign(state, user);
};

const name = computed(() => state.name);

export const userStore = readonly({
  state,
  setUser,
  name,
});
