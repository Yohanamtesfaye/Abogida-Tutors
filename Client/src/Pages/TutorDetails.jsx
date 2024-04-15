import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@mantine/core';
import loading from '../assets/loadingg.gif'
import Footer from '../Comonents/Footer';
import '../App.css';
import avatar from '../assets/Avatar.jpg'
const TutorDetails = () => {
  const [isLoading, setisLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);
  const {id} = useParams()
  const userId = localStorage.getItem('id')
  const request =async (type)=> {
    const data = {
      "is_virtual": type == 'virtual',
      "is_in_person": type == 'person'
  }
    const res = await axios.post(`http://127.0.0.1:8000/core/api/tutor/${profileData.user}/${userId}/booking/`,data)
    console.log(res.data)
    
  }
  const levels = {

    low:["Grade 1","Grade 2","Grade 3","Grade 4"],
    mid:["Grade 5","Grade 6","Grade 7","Grade 8"],
    high:["Grade 9","Grade 10","Grade 11","Grade 12"],
    kindergarten:["kindergarten"],
    collage:["collage"]
  }

  const subjects = {
    kindergarten:["English","Amharic","General Science","Mathematics"],
    low:["English","Amharic","General Science","Mathematics"],
    mid:["English","Amharic","Mathematics","General Science", "CitizenShip","Career", "Social Studies", "Physical Education"],
    high:["English","Amharic","Mathematics","ICT", "Biology","Physics","Chemistry", "History", "Physical Education","Geography", ],
    collage:["logic","freshman"]
  }



  const fetch =async () => {
    try{
    const res = await axios.get(`http://127.0.0.1:8000/user/api/profile/${id}/`)
    setProfileData(res.data.user)
    console.log(res.data)
    setisLoading(false)
    }catch(err){
      console.log(err)
    }
  }
  
  

  useEffect(()=>{
   fetch()
  },[])
  

  if(isLoading) return <div className='w-full h-screen flex flex-col justify-center items-center z-10 fixed top-0 left-0 bg-[#F4EDE4] bg-opacity-1'>
    <img src={loading}  alt="" />
  </div>
  return (
    <>
      <div className={`p-10 bg-[#F4EDE4] overflow-scroll lg:flex ${fadeIn ? 'fade-in' : ''}`}> 
    <div>
    <div className='flex shadow-lg p-10 rounded-xl h-72 my-10 bg-white lg:ml-16 '>
        <div className='p-2  text-white font-bold'>
         <img src={profileData.profile ?? avatar} className='h-52 w-52 object-contain' />
        </div> 
        <div className=' py-8 lg:ml-10'>
          <div className='font-serif mt-2 lg:text-lg text-sm  text-gray-500 font-bold'>{profileData.education}</div>
          <div className=' lg:text-2xl text-sm mt-2 font-serif font-bold'>{profileData.full_name} </div>
          {/* <div className='mb-5 font-serif mt-2 text-gray-500 font-bold'> {profileData.bio} </div> */}
          <div className='font-bold lg:text-lg text-sm'><FaMapMarkerAlt className='inline-block text-[#4a154b]'/>Addis Ababa {profileData.location}</div>
        </div>
      </div>
      <div className=' flex shadow-lg text-wrap lg:p-10 max-md:px-3 rounded-xl my-10 bg-white lg:ml-20 '>
        <div>
          <p className=' text-[#4a154b] font-serif max-md:px-20 max-md:py-5 font-bold text-2xl mb-3'>About Me</p>
          <div className='mb-10 max-md:px-10 text-lg '>{profileData.bio}</div>
          <hr className='border-[#4a154b] border-t-3' />
          <p className='font-bold text-[#4a154b] mt-10'>Education</p>
          <li className='text-gray-500 '>{profileData.uni}</li>
          <li className='text-gray-500'>{profileData.education}</li>
          <hr className='border-[#4a154b] mt-10 border-t-3' />
          <p className='font-bold text-[#4a154b] py-3 '>Grade Level</p>
          <div className='lg:flex max-sm:grid max-sm:grid-cols-3'>
  {profileData.level &&  levels[profileData.level].map((element, index) => (
    <div  className='text-white font-bold mr-3 max-md:mb-5 py-1 border border-[#4a154b] grid  px-2 bg-[#4a154b] ' key={index}>{element}</div>
  ))}
</div>

          <hr className='border-[#4a154b] mt-10 border-t-3' />
          <p className='font-bold text-[#4a154b] py-3'>Subjects</p>
          <div className='lg:flex max-sm:grid max-sm:grid-cols-3'>
          {profileData.subject &&  subjects[profileData.level].map((element, index) => (
    <div  className='text-white max-md:mb-5 font-bold mr-3 py-1 border border-[#4a154b] px-2 bg-[#4a154b] ' key={index}>{element}</div>
  ))}
          </div>
          <hr className='border-[#4a154b] mt-10 border-t-3' />
          <p className='font-bold text-[#4a154b] py-3'>Working Days</p>
          <div className='lg:flex max-sm:grid max-sm:grid-cols-3'>
            {profileData.working_days && profileData.working_days.split(' ').map((element, index) => (
            <div className='text-white font-bold mr-3 py-1 border mb-10 border-[#4a154b] px-2 bg-[#4a154b] ' key={index}>{element}</div>
            ))}
          </div>
          
          
        </div>
      </div>
    </div>
      <div className=' lg:w-1/3'>
        <div className='ml-5 flex shadow-lg p-10 rounded-xl mt-10 h-96 bg-white'>
        <div className=' py-8'>
              <div className=' text-2xl font-serif font-bold ml-8 text-[#4a154b]'>contact {profileData.name} </div>
                <div className='font-seri font-bold mt-3'><FaCheckCircle className='text-[#4a154b]  inline-block'/> Verified Tutor</div>
                <Button onClick={()=>request('virtual')}  className='bg-[#4a154b] hover:bg-white hover:text-[#4a154b] border border-[#4a154b] lg:px-20 mt-5 ml-5'>Book Online Sessions</Button>
                <Button onClick={()=>request('person')}  className='bg-[#4a154b] hover:bg-white hover:text-[#4a154b] border border-[#4a154b] lg:px-[71px] mt-5 ml-5'>Book Inperson Sessions</Button>
              </div>
        </div>
        <div className=' text-2xl font-serif font-bold lg:ml-32 ml-20 mt-5 underline text-[#4a154b]'>How It Works</div>
        <div className='ml-5 flex shadow-lg p-10 rounded-xl mt-5  bg-white '>
        <div>
              <div className=' text-xl font-serif font-bold ml-2 text-[#4a154b]'>What is an Online session </div>
              <div><p className='text-black font-bold font-serif text-sm mt-3'>This signifies that this specific tutor is open to conducting online sessions. By selecting this button, you acknowledge your agreement to enroll in virtual tutoring sessions with them.</p></div>
                
              </div>
        </div>
        <div className='ml-5 flex shadow-lg p-10 rounded-xl mt-5  bg-white '>
        <div>
              <div className=' text-xl font-serif font-bold ml-1 text-[#4a154b]'>What is an InPerson session </div>
              <div><p className='text-black font-bold font-serif text-sm mt-3'>This signifies that this specific tutor is open to conducting Inperson sessions. By selecting this button, you acknowledge your agreement to enroll in An inperson tutoring sessions with them.</p></div>
                
              </div>
        </div>
        <div className='ml-5 flex shadow-lg p-10 rounded-xl mt-5 bg-white '>
        <div>
              <div className=' text-xl font-serif font-bold ml-3 text-[#4a154b]'>How does Message Works </div>
              <div><p className='text-black font-bold font-serif text-sm mt-3'>If you wish to inquire further before making a decision to hire, you have the option to message your tutor to address any specific queries you may have, prior to taking any further steps.</p></div>
                
              </div>
        </div>
      </div>
  
      {/* <p>{profileData.Description}</p>
      <p>school Id :{profileData.id}</p>
      <p>Current Universtity: {profileData.Uni}</p> */}
    </div>
    <Footer/>
    </>
    
    
  )
}

export default TutorDetails