import { TodoItem } from "../models/TodoItem";

const STORAGE_KEY = "dashboard-todos";

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const todoService = {
  getAll(): TodoItem[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as TodoItem[];
    } catch {
      return [];
    }
  },

  saveAll(items: TodoItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  add(title: string): TodoItem[] {
    const items = this.getAll();

    const todo: TodoItem = {
      id: generateId(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [todo, ...items];

    this.saveAll(updated);

    return updated;
  },

  toggle(id: string): TodoItem[] {
    const updated = this.getAll().map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    this.saveAll(updated);

    return updated;
  },

  remove(id: string): TodoItem[] {
    const updated = this.getAll().filter((item) => item.id !== id);

    this.saveAll(updated);

    return updated;
  },
};