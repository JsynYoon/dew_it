import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

export type TodoType = {
  id?: string;
  name: string;
  description: string;
  date: string;
  priority?: string;
  image?: string;
  status?: string;
};

interface State {
  todo: TodoType[];
  addTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
  updateTodo: (todo: TodoType) => void;
  deleteAllTodo: () => void;
}

export const useStore = create(
  persist<State>(
    (set) => ({
      todo: [],
      addTodo: (todo: TodoType) =>
        set((state) => ({ todo: [...state.todo, todo] })),
      deleteTodo: (todo: TodoType) =>
        set((state) => ({ todo: state.todo.filter((t) => t.id !== todo.id) })),
      updateTodo: (todo: TodoType) =>
        set((state) => ({
          todo: state.todo.map((t) => (t.id === todo.id ? todo : t)),
        })),
      deleteAllTodo: () => set({ todo: [] }),
    }),
    { name: "todo", storage: createJSONStorage(() => localStorage) }
  )
);


