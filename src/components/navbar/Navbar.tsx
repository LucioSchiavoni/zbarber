import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex gap-2 mt-5'>

        <Link to='/reserva' className='px-2 py-1 rounded-md bg-gray-100'>Reservar</Link>
    </div>
  )
}

export default Navbar