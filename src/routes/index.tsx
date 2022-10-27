import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import Dashboard from '../pages/dashboard/Dashboard';
import PeopleList from '../pages/people/PeopleList';
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
        icon: 'people',
        path: '/people',
        label: 'People',
      },
    ])
  }, [])
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard/>} />
      <Route path="/people" element={<PeopleList/>} />
      {/* <Route path="/cities/detail/:id" element={<CitiesList/>} /> */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
