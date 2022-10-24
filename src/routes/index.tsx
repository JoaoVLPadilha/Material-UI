import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import Dashboard from '../pages/dashboard/Dashboard';
import CitiesList from '../pages/cities/CitiesList';
export const AppRoutes = () => {
  const {setDrawerOptions } = useAppDrawerContext();
  React.useEffect(() =>{
    setDrawerOptions([
      {
        icon: 'home',
        path: 'pagina-inicial',
        label: 'Home Page',
      },
      {
        icon: 'star',
        path: 'star page',
        label: 'Star Page',
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cities',
      },
    ])
  }, [])
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard/>} />
      <Route path="/cities" element={<CitiesList/>} />
      {/* <Route path="/cities/detail/:id" element={<CitiesList/>} /> */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
