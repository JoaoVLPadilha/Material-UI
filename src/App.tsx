import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './routes';
import FirstPage from './shared/components/FirstPage';
import Login from './shared/components/login/Login';
import MenuLateral from './shared/components/menu-lateral/MenuLateral';
import {
  AppDrawerProvider,
  AppThemeProvider,
  AuthProvider,
} from './shared/contexts';
function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
          <AppDrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </AppDrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
