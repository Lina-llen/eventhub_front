import './App.css'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useState } from 'react'
import AuthContext from './Contexts/AuthContext'
import NavBar from './Components/NavBar'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import EventsPage from './Pages/EventsPage'
import EventPage from './Pages/EventPage'
import ProfilePage from './Pages/ProfilePage'
import authService from './Services/authServices'
import AuthWrapper from './Wrappers/AuthWrapper'

const token = window.localStorage.getItem('token')
if (token && authService.isConnected()) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

function App() {
  const [isConnected, setIsConnected] = useState(authService.isConnected());

  return (
    <AuthContext.Provider value={{ isConnected, setIsConnected }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/events' element={<AuthWrapper> <EventsPage /> </AuthWrapper>} />
          <Route path='/event/:id' element={<AuthWrapper> <EventPage /> </AuthWrapper>} />
          <Route path='/profile' element={<AuthWrapper> <ProfilePage /> </AuthWrapper>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
