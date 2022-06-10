import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import ObjectsList from '../components/ObjectsList';
import ObjectEdit from '../components/ObjectEdit';

function Pages() {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        <Route path='/:objectType' element={<ObjectsList />} />
        <Route path='/object/:id' element={<ObjectEdit />} />
      </Routes>
  )
}

export default Pages;