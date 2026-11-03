import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import NavBar from './Components/NavBar'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import EventsPage from './Pages/EventsPage'
import EventPage from './Pages/EventPage'
import NavBar from './Components/NavBar'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/event' element={<EventsPage />} />
          <Route path='/event/:id' element={<EventPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
