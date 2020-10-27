import { computed, reactive, readonly } from 'vue';

export interface User {
  id: string;
  name: string;
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
    name
})
