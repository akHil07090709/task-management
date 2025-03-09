import { create } from "zustand";
import {
  db,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "../config/firebase";

const useTaskStore = create((set) => ({
  tasks: [],

  fetchTasks: (userId) => {
    const tasksRef = collection(db, "tasks");
    onSnapshot(tasksRef, (snapshot) => {
      const tasksData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((task) => task.createdBy === userId);
      set({ tasks: tasksData });
    });
  },

  addTask: async (task) => {
    await addDoc(collection(db, "tasks"), task);
  },

  updateTask: async (id, updatedTask) => {
    await updateDoc(doc(db, "tasks", id), updatedTask);
  },

  deleteTask: async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  },
}));

export default useTaskStore;
