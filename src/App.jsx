import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
