
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="text-blue-600 font-bold text-xl">
        <Link to="/">📝 Todo App</Link>
      </div>

      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/home" className="hover:text-blue-500">Home</Link>
        <Link to="/notes" className="hover:text-blue-500">Create</Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-500">Login</Link>
            <Link to="/signup" className="hover:text-blue-500">Signup</Link>
          </>
        ) : (
          <div className="flex space-x-4 items-center">
            <span className="text-blue-600">{user.email}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </div>
        )}
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden z-10">
          <Link to="/home" onClick={() => setIsOpen(false)} className="py-2 text-blue-600">Home</Link>
          <Link to="/notes" onClick={() => setIsOpen(false)} className="py-2 text-blue-600">Notes</Link>
          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="py-2 text-blue-600">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="py-2 text-blue-600">Signup</Link>
            </>
          ) : (
            <button onClick={() => { logout(); setIsOpen(false); }} className="py-2 text-red-600">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
