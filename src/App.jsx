import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Calendar from './components/calendar/Calendar';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/reserva' element={<Calendar/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App