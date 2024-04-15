import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TutorInfo from '../Comonents/TutorInfo';
import Footer from '../Comonents/Footer';
import '../App.css';
const Client = () => {

  const [data, setdata] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);
  useEffect(()=>{
    axios.get('https://tutor-website-backend.onrender.com/core/api/client/dashboard')
    .then(res=>{
      setdata(res.data)
      console.log(res.data)
      setinitialData(res.data)
    })
    .catch(err=> console.log(err));
  },[])

  const handleChange = (e) => {

    const { name, value } = e.target;
    if(name == 'subject') {
      const res = initialData.filter(item => value == '' || item.subject == value)
      setdata(res)
    } else if(name == 'level') {
      const res = initialData.filter(item => value == '' || item.level == value)
      setdata(res)
    }
    else if(name == 'location') {
      const res = initialData.filter(item => value == '' || item.location == value)
      setdata(res)
    }

};
  return (
    <div className={`w-full bg-[#F4EDE4] ${fadeIn ? 'fade-in' : ''}`}>
      <div className='ml-20 pt-20'>
        <h1 className='text-4xl font-serif font-bold text-black'>Private Tutors that fit your Schedule</h1>
        <p className='px-4 text-xl text-gray-600'>Find your perfect private tutor and arrange a Free Video Meeting. Then book <br />one-to-one Online Lessons to fit your schedule.</p>
        <button className='px-4 py-2 mt-5 ml-4 bg-[#4a154b] font-bold text-white rounded-lg hover:text-[#4a154b] border hover:bg-white'>Book A Tutor</button>
      </div>
      <div className='lg:flex justify-between lg:px-40 mt-10'>
        <div>
          <select  name='location'   onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 px-28 py-1 rounded-lg ' id="">
                <option value="">Location</option>
                <option value="kality">Addis Ababa Kality</option>
                <option value="saris">Addis Ababa Saris</option>
                <option value="bole">Addis Ababa Bole</option>
                <option value="megenagna">Addis Ababa Megenagn</option>
                <option value="gotera">Addis Ababa Gotera</option>
            </select>
        </div>
      <div>
        <select name='subject' onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 px-28 py-1 rounded-lg ' id="">
          <option value="">Subject</option>
          <option value="All">All</option>
          <option value="English">English</option>
          <option value="Maths">Maths</option>
          <option value="General Science">General Science</option>
          <option value="Social Studies">Social Studies</option>
          <option value="Other">Other</option>
      </select>
      </div>
      <div>
        <select name='level' onChange={handleChange}  className='inline-block bg-gray-100  border mt-5 text-gray-600 font-bold px-28 py-1 rounded-lg ' id="">
          <option value="">Level</option>
          <option value="low">PreSchool</option>
          <option value="mid">Middle School</option>
          <option value="high">High School</option>
          <option value="collage">Collage</option>
      </select>
      </div>
      </div>
      <div className=' lg:mx-20 my-10 lg:grid lg:grid-cols-3'>
        {data.map((d) => ( 
          <div key={d.id} className=" rounded-lg">
            <TutorInfo data={d} />
          </div>
        ))}
      </div>
      
      
       <Footer/>
    </div>
  )
}

export default Client