import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppThemeContext, useAppDrawerContext } from '../shared/contexts';
import FirstPage from '../shared/components/FirstPage';
export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();
  React.useEffect(() =>{
    setDrawerOptions([
      {
        label: 'Home Page',
        icon: 'home',
        path: 'pagina-inicial'
      },
      {
        label: 'Star Page',
        icon: 'star',
        path: 'star page'
      },
    ])
  }, [])
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<FirstPage />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
