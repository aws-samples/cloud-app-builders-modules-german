import { createContext, useState } from 'react';
import './App.css';
import { FlashbarProps } from '@cloudscape-design/components';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import Background from './components/Background';
import NotificationBanner from './components/NotificationBanner';

const i18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

export interface Notifications {
  notifications: FlashbarProps.MessageDefinition[],
  pushNotification: (newNotification: FlashbarProps.MessageDefinition) => void
}
export const NotificationContext = createContext<Notifications>({ notifications: [], pushNotification: (not) => { } });


function App() {
  const [notifications, setNotifications] = useState<FlashbarProps.MessageDefinition[]>([]);


  const handleNewNotification = (newNotification: FlashbarProps.MessageDefinition) => {
    const oldOnDismiss = newNotification.onDismiss;
    newNotification.onDismiss = (event) => {
      setNotifications(notifications.filter(notification => notification.id !== newNotification.id));
      try {
        if (oldOnDismiss) {
          oldOnDismiss(event);
        }
      } catch (error) {
        // TODO is this catch needed to prevent a child component from destroying the entire app?   
      }
    }
    setNotifications(notifications.concat([newNotification]));
  }





  return (
    <NotificationContext.Provider value={{ notifications: notifications, pushNotification: handleNewNotification }}>
      <Background />
      <ThemeToggle />
      <NotificationBanner />
      <TodoList />
    </NotificationContext.Provider>
  );
}

export default App;
