import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './routes';
import { LightTheme } from './shared/themes';
function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
