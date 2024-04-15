import React from 'react'
import logo from '../assets/logoo.png'
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TutorWaiting = () => {
  const email = localStorage.getItem('email')
  return (
    <>
   <div className='flex justify-center items-center '>
     <img src={logo} width={'100px'} className='mt-20 font-bold text-4xl mb-20'/>
    </div> 
    <div className='flex-row text-center justify-center items-center mt-5'>
      <div className='font-bold text-4xl mb-5 text-[#4a154b]'>Thank you For Applying</div>
      <div className='text-lg mb-20 font-bold'>We will send an Email to {email} as soon as we revised your application </div>
      {/* <p className='font-bold'>{email}</p> */}
      <Link to='/' className="px-20 py-2 ml-4 bg-gray-300 font-bold hover:bg-gray-200 rounded-lg"  ><AiOutlineMail className=' inline-block text-blue-600 mr-5 text-2xl'/> Main Page</Link>
      <p className='mt-7 text-md font-bold text-[#4a154b] hover:text-gray-600'>Resend Application</p>
    </div>
    </>
    
  )
}

export default TutorWaiting