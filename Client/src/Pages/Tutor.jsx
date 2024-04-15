import React, { useEffect, useState } from 'react'
import { BiBell } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/Avatar.jpg'
import Navbar from '../Comonents/Navbar';
import tutor from '../assets/tutor.png'
import Footer from '../Comonents/Footer';
const Tutor = () => {
 const fullname =  localStorage.getItem('full_name')
 const location =  localStorage.getItem('location')
 console.log(location)
 const [fadeIn, setFadeIn] = useState(false);
 useEffect(() => {
   // Trigger the fade in effect when the component mounts
   setFadeIn(true);
 }, []);
  const [data, setData] =useState([]);
  const [students, setStudents] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [complete, setComplete] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const id = localStorage.getItem('id')
  const request =async (client_id)=> {
    
    const data = {
      "is_virtual": false,
      "is_in_person": false
  }
    const res = await axios.post(`http://127.0.0.1:8000/core/api/client/${id}/${client_id}/booking/`,data)
    console.log(res.data)
    setStudents(prev=> prev.filter(item=>item.user != client_id))
  }

  const completeJob =async (job_id)=> {
    const date = new Date().toJSON().slice(0,10)
    const data = {
      'end_date': date
  }
    const res = await axios.put(`http://127.0.0.1:8000/core/api/ongoing-jobs/${job_id}/complete/`,data)
    console.log(res.data)
    await fetch()
  }

  const fetch = async () => {
    try{
        const ress = await axios.get('http://127.0.0.1:8000/core/api/tutor/dashboard/')
        const reson = await axios.get(`http://127.0.0.1:8000/core/api/ongoing-jobs/${id}/`)
        const resco = await axios.get(`http://127.0.0.1:8000/core/api/completed-jobs/${id}/`)

        setStudents(ress.data);
        setOngoing(reson.data)
        setComplete(resco.data)
    }catch(err){
        console.log(err);
    }
  }
  useEffect(() => {
   fetch()  
  }, []);
  // console.log(data)
  console.log(students)
  return (<>
      {/* navbar */}
      <div className='p-5'>
      
      {/* intro */}
      <div className={`flex justify-between px-20 ${fadeIn ? 'fade-in' : ''}`}>
      <div>
          <h1 className='text-gray-600 font-serif lg:text-5xl text-3xl px-4 mt-10'>Wellcome</h1>
          <p className='px-4 mt-2 font-bold font-serif text-lg lg:text-3xl'>{localStorage.getItem('full_name')}</p>
          <h1 className='text-gray-600 font-serif text text-2xl px-4 mt-8'>Total Earning</h1>
          <p className='px-4 mt-2 font-bold font-serif text-lg'>0.0</p>
        </div>
        <div className='mr-44 md:block hidden'>
          <img src={tutor} width={'400px'} />
        </div>
      </div>
      <div className='flex justify-center mt-10'>
        <div className='lg:mr-48 bg-gradient-to-r mr-5 p-5 bg-teal-300 border-solid rounded-xl border-2 border-teal-600 lg:p-10'>
        <p className='font-bold text-white text-3xl font-serif'>{students.length}</p>
          <p className='font-bold text-white font-serif'>Available Jobs</p>
          
        </div>
        <div className='lg:mr-48 bg-green-300 mr-5 p-5 border-solid border-green-600 rounded-xl border-2 lg:p-10'>
          <p className='font-bold text-white text-3xl font-serif'>{ongoing.length}</p>
          <p  className='font-bold text-white font-serif'>On Goining Jobs</p>
         
        </div>
        <div className='rounded-xl border-orange-600 p-5 border-2 lg:p-10 bg-orange-300'> 
          <p className='font-bold text-3xl text-white font-serif'>0</p>
          <p  className='font-bold text-white font-serif'>Total Days</p>
          
        </div>
      </div>

      
      <div className="flex justify-center mt-10">
      {/* Tab Headers */}
      <div className="flex">
        <button
          className={`lg:px-20 py-2 mr-2 lg:mr-20 rounded-t-lg ${activeTab === 1 ? ' text-[#4a154b] text-3xl font-bold' : ' text-xl text-gray-600 '}`}
          onClick={() => setActiveTab(1)}
        >
         Available Jobs
        </button>
        <button
          className={`lg:px-20 py-2 mr-2 lg:mr-20 rounded-t-lg ${activeTab === 2 ? ' text-[#4a154b] text-3xl font-bold' : ' text-xl text-gray-600 '}`}
          onClick={() => setActiveTab(2)}
        >
         Ongoing Jobs
        </button>
        <button
          className={`lg:px-20 py-2 rounded-t-lg ${activeTab === 3 ? ' text-[#4a154b] text-3xl font-bold' : ' text-xl text-gray-600'}`}
          onClick={() => setActiveTab(3)}
        >
          Completed
        </button>
      </div>

      {/* Tab Content */}
     
    </div>
    <div className="p-4 lg:mx-24 mt-5  rounded-lg">
        {activeTab === 1 && <div>
          {students.map(student => ( //student.location == location &&
            <Link> 
                <div key={student.id} className=" text-gray-600 mx-5 shadow-lg p-3 rounded-xl my-3 bg-white transition-transform hover: hover:shadow- hover:-translate-y-1">
                  <div className='lg:flex justify-between'>
                    <div>
                      <div  className='flex'>
                        <div>
                         <p className="text-3xl  mr-10"><img src={avatar} alt="" /></p>
                        </div>
                        <div>
                          <p className="mr-2 font-bold text-2xl font-serif text-black">{student.full_name}</p>
                          {student.role === 'P' && <p className='font-bold text-black'>Parent</p>}
                          <div className=''>
                            <p className='text-lg inline-block mr-4'><span className='font-bold'>Grade level: </span> {student.level}</p>
                            <p className='mr-4'><span className='font-bold'>Subjects:</span> {student.subject}</p> 
                            <p><span className='font-bold'>Location: </span>{student.location}</p>
                          </div>       
                        </div>                     
                    </div>       
                    </div>
                    <div>
                    <p onClick={()=>request(student.user)}  className='mr-20 bg-[#4a154b] text-white font-bold border border-[#4a154b] px-20 py-2 hover:text-[#4a154b] hover:bg-white rounded-lg'>Apply</p>
                    </div>
                  </div>                  
                </div>
                </Link> ))}
          </div>}
        {activeTab === 2 && <div>Content of Ongoing Job
          {ongoing.map(student => ( //student.location == location &&
            <Link> 
                <div key={student.id} className=" text-gray-600 mx-5 shadow-lg p-3 rounded-xl my-3 bg-white transition-transform hover: hover:shadow- hover:-translate-y-1">
                  <div className='lg:flex justify-between'>
                    <div>
                      <div  className='flex'>
                        <div>
                         <p className="text-3xl  mr-10">👩‍🎓</p>
                        </div>
                        <div>
                          <p className="mr-2 font-bold text-2xl font-serif text-black">{student.full_name}</p>
                          {student.role === 'P' && <p className='font-bold text-black'>Parent</p>}
                          <div className=''>
                            <p className='text-lg inline-block mr-4'><span className='font-bold'>Grade level: </span> {student.level}</p>
                            <p className='mr-4'><span className='font-bold'>Subjects:</span> {student.subject}</p> 
                            <p><span className='font-bold'>Location: </span>{student.location}</p>
                          </div>       
                        </div>                     
                    </div>       
                    </div>
                    <div>
                    <p onClick={()=>completeJob(student.job_id)}  className='mr-20 bg-[#4a154b] text-white font-bold border border-[#4a154b] px-20 py-2 hover:text-[#4a154b] hover:bg-white rounded-lg'>Complete</p>
                    </div>
                  </div>                  
                </div>
                </Link> ))}
          </div>}
        {activeTab === 3 && (
           <div>Content of Ongoing Job
           {complete.map(student => ( //student.location == location &&
             <Link> 
                 <div key={student.id} className=" text-gray-600 mx-5 shadow-lg p-3 rounded-xl my-3 bg-white transition-transform hover: hover:shadow- hover:-translate-y-1">
                   <div className='lg:flex justify-between'>
                     <div>
                       <div  className='flex'>
                         <div>
                          <p className="text-3xl  mr-10">👩‍🎓</p>
                         </div>
                         <div>
                           <p className="mr-2 font-bold text-2xl font-serif text-black">{student.full_name}</p>
                           {student.role === 'P' && <p className='font-bold text-black'>Parent</p>}
                           <div className=''>
                             <p className='text-lg inline-block mr-4'><span className='font-bold'>Grade level: </span> {student.level}</p>
                             <p className='mr-4'><span className='font-bold'>Subjects:</span> {student.subject}</p> 
                             <p><span className='font-bold'>Location: </span>{student.location}</p>
                           </div>       
                         </div>                     
                     </div>       
                     </div>
                     
                   </div>                  
                 </div>
                 </Link> ))}
           </div>
        )}
      </div>
      <div>
        <div>

        </div>
      </div>
      </div>
      <Footer/>
  </>
    
  )
}

export default Tutor