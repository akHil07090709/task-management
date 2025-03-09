import { create } from "zustand";
import { auth, onAuthStateChanged } from "../config/firebase";

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  logout: async () => {
    await auth.signOut();
    set({ user: null, loading: false });
  },
}));

onAuthStateChanged(auth, (user) => {
  useUserStore.setState({ user });
});

export default useUserStore;
