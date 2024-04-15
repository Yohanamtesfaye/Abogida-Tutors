import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/Avatar.jpg'
const TutorInfo = ({data}) => {
  const id = data.user ;
  const value = `/tutordetail/${id}`;
  return (
    <Link to={value}>
    <div className=' mx-5 flex shadow-lg p-3 rounded-xl my-3 bg-white transition-transform hover: hover:shadow- hover:-translate-y-1'>
     <div className='w-1/2'>
     <div className='p-2  text-white font-bold'>
         <img src={data.profile ?? avatar} className='h-52 w-52 object-contain' />
        </div> 
        {/* <div className='px-3'>5⭐ <FaMapMarkerAlt className='inline-block text-red-500 ml-12 mr-1'/> {data.location}</div> */}
     </div> 
         <div className=' mt-4 w-1/2'>
      <div className='mt-5 text-2xl font-serif font-bold hover:text-[#4a154b] '> {data.full_name}</div>
       <div className='max-w-prose' style={{ maxWidth: '130ch' }}><p className='line-clamp-2 font-bold text-gray-600'>{data.bio} </p>  </div>
       
    </div>
    <div className= 'w-1/3'>
       <button className='px-2 py-2 ml-4  bg-[#4a154b] font-bold text-white rounded-lg'>View More</button>
     </div>
     </div>
       </Link>
  )
}

export default TutorInfo