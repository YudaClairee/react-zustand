import { create } from "zustand";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  editTodo: Todo | null;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setEditTodo: (todo: Todo | null) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  editTodo: null,
  addTodo: (text) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    set((state) => ({ todos: [...state.todos, newTodo] }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  setEditTodo: (todo) => {
    set((state) => ({
      editTodo: todo,
    }));
  },
}));
