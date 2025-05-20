import React from 'react';
import AppNavigation from './screens/navigation/navigation';
import { AuthProvider } from './context/auth/authcontext';
import { SocietyProvider } from './context/society/societycontext';
import { EventProvider } from './context/events/eventcontext';
const App = () => {
  return (
    <AuthProvider>
      <SocietyProvider>
        <EventProvider>
          <AppNavigation />
        </EventProvider>
      </SocietyProvider>
    </AuthProvider>
  );
};

export default App;
