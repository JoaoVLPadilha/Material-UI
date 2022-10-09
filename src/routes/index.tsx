import React from 'react'
import { Routes, Navigate, Route } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppThemeContext, useAppDrawerContext } from '../shared/contexts';
import FirstPage from '../shared/components/FirstPage';
export const AppRoutes = () => {
  const {toggleTheme} = useAppThemeContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<FirstPage/>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
