import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import logo from '../assets/logoo.png'
const Navbar = () => {
  const username = localStorage.getItem('username');
  const name = localStorage.getItem('full_name');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('full_name');
    localStorage.removeItem('email');
    localStorage.removeItem('isVerified');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const check =()=> {
    if(!localStorage.getItem('isVerified')){
      navigate('/login')
    }
  }

  useEffect(()=>{
    // check()
  },[])

  return (
    <>
    
      <div className='flex justify-between bg-white p-5 font-bold'>
        <div className='text-black'>
        <div><img src={logo} alt="logo" width={'50px'} /></div>
        </div>
        <div className='flex text-black '>
          <div className='md:flex hidden'>
            <Link className='mr-10 hover:text-gray-400' to='/'>Home</Link>
            <Link to='/prices' className='mr-8 hover:text-gray-400'>Pricing</Link>
            {username == null ? (
              <>
                <Link className='mr-10 hover:text-gray-400' to='/register'>Register</Link>
                <Link to='login' className='mr-8 bg-[#4a154b] text-white font-bold border border-[#4a154b] px-6 pt-1 hover:text-[#4a154b] hover:bg-white rounded-lg'>Login</Link>
                <Link to='/register' className='bg-[#4a154b] px-5 pt-1  font-bold text-white rounded-lg hover:text-[#4a154b] border hover:bg-white'>Sign Up</Link>
              </>
            ) : (
              <>
                <Link className='mr-8 hover:text-gray-400' to='/client'>Find a tutor</Link>
                <Link to='/clientnotification' className='text-4xl mr-8 text-[#4a154b] '><BiBell/></Link>
                <p onClick={handleLogout} className='bg-[#4a154b] text-white font-bold border border-[#4a154b] px-6 py-1 hover:text-[#4a154b] hover:bg-white rounded-lg'>Logout</p>
              </>
            )}
          </div>
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='focus:outline-none'>
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='flex flex-col py-7 font-bold items-center'>
          <Link to='/' className='px-[103px]  border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid'>Home</Link>
            {username == null ? (
              <>
                <Link className='px-24 mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid'  to='/register'>Register</Link>
                <Link className='px-[100px] mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid' to='/prices'>Pricing</Link>
                <Link className='px-[105px] mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid' to='login'>Login</Link>
                <Link className='px-24 mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid' to='/register'>Sign Up</Link>
              </>
            ) : (
              <>
                <Link className='px-[83px] mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid' to='/client'>Find a tutor</Link>
                <Link to='/tracker' className='px-[100px] mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid' >Tracker</Link>
                <Link to='/clientnotification' className='px-[70px] mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid inline-block' ><BiBell className='inline-block mr-2'/> Notifcation</Link>
                <p onClick={handleLogout} className='px-[99px] mt-1 border-2 bg-white py-2 hover:opacity-55 rounded-3xl border-solid' >Logout</p>
              </>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Navbar;