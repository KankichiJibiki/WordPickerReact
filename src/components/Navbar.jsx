import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-teal-500 border-b border-indigo-300'>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
                <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    {/* left nav */}
                    <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
                        <span className='hidden md:block text-white text-2xl font-bold ml-2'>Word Picker</span>
                    </NavLink>
                    {/* right nav */}
                    <div className="md:ml-auto">

                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar