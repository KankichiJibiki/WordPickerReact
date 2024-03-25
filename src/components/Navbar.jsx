import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const linkClass = ({ isActive }) => isActive ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-lg';

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
                        <div className="flex space-x-1">
                            <NavLink
                            to="/"
                            className={linkClass}
                            >Home
                            </NavLink>
                            <NavLink
                            to="/login"
                            className={linkClass}
                            >Log in
                            </NavLink>
                            <NavLink
                            to="/signup"
                            className={linkClass}
                            >Sign up
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar