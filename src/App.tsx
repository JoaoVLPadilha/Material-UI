import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './routes';
import MenuLateral from './shared/components/menu-lateral/MenuLateral';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';
function App() {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
