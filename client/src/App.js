import React from 'react';
import Navbar from './Components/layout/Navbar';
import Home from './Components/pages/Home';
import { Routes,Route} from 'react-router-dom';
import NotFound from './Components/pages/NotFound';
import AddUser from './Components/pages/AddUser';
import EditUser from './Components/pages/EditUser';

export const App = () => {
  return (
      <>
      <Navbar/>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/add/users' exact element={<AddUser/>}/>
            <Route path='/update/:id' exact element={<EditUser/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </>
  )
}
