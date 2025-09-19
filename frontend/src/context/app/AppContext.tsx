import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { message, notification } from 'antd';

interface AppState {
  theme: 'light' | 'dark';
  language: 'en' | 'vi';
  sidebarCollapsed: boolean;
  loading: boolean;
}

interface AppContextType extends AppState {
  toggleTheme: () => void;
  setLanguage: (language: 'en' | 'vi') => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  showMessage: (type: 'success' | 'error' | 'warning' | 'info', content: string) => void;
  showNotification: (type: 'success' | 'error' | 'warning' | 'info', title: string, description: string) => void;
}

type AppAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'vi' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  theme: 'light',
  language: 'vi',
  sidebarCollapsed: false,
  loading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setLanguage = (language: 'en' | 'vi') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const showMessage = (type: 'success' | 'error' | 'warning' | 'info', content: string) => {
    message[type](content);
  };

  const showNotification = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    description: string
  ) => {
    notification[type]({
      message: title,
      description,
      placement: 'topRight',
    });
  };

  const value: AppContextType = {
    ...state,
    toggleTheme,
    setLanguage,
    toggleSidebar,
    setLoading,
    showMessage,
    showNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
