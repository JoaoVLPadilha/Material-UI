import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import Dashboard from '../pages/dashboard/Dashboard';
export const AppRoutes = () => {
  const {setDrawerOptions } = useAppDrawerContext();
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
      <Route path="/pagina-inicial" element={<Dashboard/>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
