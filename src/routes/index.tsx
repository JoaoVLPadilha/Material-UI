import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import Dashboard from '../pages/dashboard/Dashboard';
import PeopleList from '../pages/people/PeopleList';
import PeopleDetail from '../pages/people/PeopleDetail';
import CityList from '../pages/city/CityList';
import CityDetail from '../pages/city/CityDetail';
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
        icon: 'location_city',
        path: '/city',
        label: 'Cities',
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
      <Route path="/people/detail/:id" element={<PeopleDetail/>} />
      <Route path="/city" element={<CityList/>} />
      <Route path="/city/detail/:id" element={<CityDetail/>} />
      {/* <Route path="*" element={<Navigate to="/pagina-inicial" />} /> */}
    </Routes>
  );
};
