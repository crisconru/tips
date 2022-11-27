import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AboutScreen from './AboutScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import NavBar from './NavBar';


const AppRouter = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='*' element={<h1>NO EXISTE ESTO SAECIO</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter