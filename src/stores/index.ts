import { create } from "zustand";
import { persist } from "zustand/middleware";

// ========================================
// Auth Store
// ========================================
interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: AuthState["user"]) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);

// ========================================
// UI Store
// ========================================
interface UIState {
  sidebarCollapsed: boolean;
  theme: "dark" | "light";
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: "dark" | "light") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: "dark",
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "ui-storage" }
  )
);

// ========================================
// Notifications Store
// ========================================
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Date;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationsStore = create<NotificationsState>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date(),
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },
  removeNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? state.unreadCount - 1
          : state.unreadCount,
      };
    });
  },
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));

// ========================================
// AURA Store
// ========================================
interface AURAMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  action?: {
    type: string;
    params: Record<string, unknown>;
    status: "pending" | "confirmed" | "executed" | "cancelled";
  };
}

interface AURAState {
  messages: AURAMessage[];
  isProcessing: boolean;
  addMessage: (message: Omit<AURAMessage, "id" | "timestamp">) => void;
  updateMessageAction: (id: string, status: "pending" | "confirmed" | "executed" | "cancelled") => void;
  setProcessing: (processing: boolean) => void;
  clearMessages: () => void;
}

export const useAURAStore = create<AURAState>()((set) => ({
  messages: [],
  isProcessing: false,
  addMessage: (message) => {
    const newMessage: AURAMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
  },
  updateMessageAction: (id, status) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id && m.action ? { ...m, action: { ...m.action, status } } : m
      ),
    }));
  },
  setProcessing: (processing) => set({ isProcessing: processing }),
  clearMessages: () => set({ messages: [] }),
}));
