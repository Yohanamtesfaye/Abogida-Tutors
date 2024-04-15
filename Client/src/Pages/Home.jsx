import Typewriter from 'typewriter-effect';
import React, { useContext, useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomeData from '../HomeData';
import FAQItem from '../Comonents/FAQItem';
import image1  from '../assets/i1r.png';
import image2  from '../assets/i2r.png';
import image3  from '../assets/i3r.png';
import icon  from '../assets/icon.jpeg';
import icon2  from '../assets/icon2.jpeg';
import icon3  from '../assets/icon3.jpeg';
import icon4  from '../assets/icon4.jpeg';
import faq  from '../assets/faq.jpg';
import client from '../assets/client.png'
import '../App.css';
import { Link } from 'react-router-dom';
import TutorInfo from '../Comonents/TutorInfo';
import axios from 'axios'
import { UserInfo } from '../App';
import Footer from '../Comonents/Footer';
import empty from '../assets/empty.png'
const Home = () => {
  const {info,setInfo} = useContext(UserInfo)
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);

  console.log(info)
  const [data, setdata] = useState([]);
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/core/api/client/dashboard')
    .then(res=>setdata(res.data))
    .catch(err=> console.log(err));
  },[])
  const handleClick = (data) => {
    setInfo(data)

  }
  const username = localStorage.getItem('username')
  const name = localStorage.getItem('full_name')
  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };
  return (
    <>
    <div className={`bg-white font-serif h-screen text-black ${fadeIn ? 'fade-in' : ''}`}>
          {username == null ? <>
            <div className='flex'>
              <div className='p-8 lg:w-1/2'>
                <h1 className='lg:text-7xl text-2xl font-bold mb-4'>Personalized Tutoring Tailored Just for You</h1>
                <p className='text-lg'>Welcome to abogida Tutor, where learning knows no bounds. Our dedicated team of expert tutors is here to empower you on your academic journey.</p>
              <div className=' lg:flex mt-8'>
                <div className='mb-10'><Link to='studentRegistration'  className='bg-[#4a154b] text-white font-bold py-2 hover:bg-white  hover:text-[#4a154b] px-5 border border-[#4a154b] lg:px-14'>Enroll As Student</Link></div>
                <div><Link to='tutorregistration' className='hover:bg-[#4a154b] font-bold py-2 bg-white text-[#4a154b] hover:text-white border border-[#4a154b] px-2 lg:px-16 lg:ml-5'>Become A Tutor</Link></div>
            </div> 
            </div>  
            <div className='md:block hidden animated-img p-8'>
          <img src={image1} alt="Tutor" className='w-full h-auto animate-fadeInRight' />
        </div>
          </div>     
          </>
         
          :<>
           <div className='flex'>
              <div className='p-8'>
              <h1  className='lg:text-7xl text-4xl lg:w-1/2 font-bold mb-4'>
         <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 50,
            strings: ["Wellcome " + name ,"Thank you for choosing Abugida Tutors, lets get started!"]
          }}
        />
         </h1>
                <p className='text-lg font-serif'>Welcome <span className='font-bold'>{name}</span> to Abogida Tutor, where learning knows no bounds. Our dedicated team of expert tutors is here to empower you on your academic journey.</p>
                <div className='mt-10'><Link to='client'  className='bg-[#4a154b] text-white font-bold py-2  hover:bg-white hover:text-[#4a154b] border border-[#4a154b] px-14'>Find Your Tutor</Link></div> 
            </div>  
            <div className='animated-img md:block hidden  p-8'>
          <img src={client} width={'800px'} alt="Tutor" className=' h-auto animate-fadeInRight' />
        </div>
          </div>              
          </> }
          {username == null ? <>
            <div className='bg-[#F4EDE4] '>
              <div className='flex justify-center font-bold text-center text-4xl mb-5 p-3  '>Explore Our Grade Options</div>
              <div className="lg:hidden px-10">
  {HomeData.map((option, index) => (
    <div key={index} className='lg:flex justify-center mb-10'>
      <div className='mx-auto lg:mx-10 w-full lg:w-auto flex-shrink-0 shadow-lg p-8 rounded-xl my-10 bg-white'>
        <div className='bg-[#4a154b] border border-[#4a154b] p-2 h-10 text-white font-bold'>
          {option.id}
        </div>
        <div className='mt-6'>
          <div className='mt-4 text-xl font-serif font-bold'>{option.name}</div>
          <div className='mt-4 text-lg'>{option.descp}</div>
        </div>
      </div>
    </div>
  ))}
</div>

<div className="hidden lg:block">
  <Slider {...settings}>
    {HomeData.map((option, index) => (
      <div key={index} className='lg:flex justify-center mb-10'>
        <div className='mx-auto lg:mx-10 w-full lg:w-auto flex-shrink-0 shadow-lg p-8 rounded-xl my-10 bg-white'>
          <div className='bg-[#4a154b] border border-[#4a154b] p-2 h-10 text-white font-bold'>
            {option.id}
          </div>
          <div className='mt-6'>
            <div className='mt-4 text-xl font-serif font-bold'>{option.name}</div>
            <div className='mt-4 text-lg'>{option.descp}</div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>


              </div>
              <div className='lg:flex justify-between bg-[#F4EDE4]  items-center'>
              <div className='animated-img p-8'>
              <img src={image2} alt="Tutor" className='w-full h-auto animate-fadeInRight' />
            </div>
            <div className='lg:w-1/2 p-8'>
              <h1 className='lg:text-4xl text-2xl font-bold mb-4'>Trusted by parents & students</h1>
              <p className='text-gray-500 font-serif text-lg '>MyTutor is Addis Ababa's most trusted tutoring platform by parents and university students. We're rated 4.5/5 on Trustpilot from the million (and counting!) lessons we've delivered so far. And because our tutors get such good results, schools use them to support their teaching. We work with 650+ tutors across Addis Ababa, 
                targeting learning gaps and helping students everywhere achieve their goals..</p>

            </div>
            </div>
            <div className='lg:flex justify-between bg-[#F4EDE4] items-center'>

 
<div className='lg:w-1/2 p-8'>
  <h1 className='lg:text-4xl text-2xl font-serif font-bold mb-4'>Help from our team, every step of the way</h1>
  <p className='text-gray-500 font-serif text-lg'>Our expert tutor-matching team can pair your child with the perfect tutor for their needs - from subject and level, right down to exam board and personality match. They're always on hand to listen, answer questions, and provide tailored support. Additionally, our platform allows you to find tutors based on location, ensuring convenience and accessibility. any where in Addis Ababa ,
     we have a network of tutors ready to assist your child in achieving their fullest potential.</p>

</div>
<div className='animated-img lg:w-1/2 p-8'>
  <img src={image3} alt="Tutor" className='w-full h-auto animate-fadeInRight' />
</div>
</div>

 
<div className='flex justify-between bg-white items-center pt-20'>
  <div className='lg:flex'>
    <div className='flex flex-col items-center px-10 mx-10'>
      <div className='mb-20 h-[183px] w-[181px] hover:animate-bounce'>
        <img src={icon} alt="" />
      </div>
      <h1 className='font-bold text-2xl items-center pb-2'>Register</h1>
      <p className='text-lg'>First, you can visit our website and complete the registration process. Simply navigate to our website and click on the "Register" button to create an account.</p>
    </div>
    <div className='flex flex-col items-center px-10 mx-10 pt-20'>
      <div className='mb-20 h-[183px] w-[181px] hover:animate-bounce'>
        <img src={icon2} alt="" />
      </div>
      <h1 className='font-bold text-2xl items-center pb-2'>Search your Tutor</h1>
      <p className='text-lg'>Students should be able to search for tutors based on subjects, availability, ratings, and location.</p>
    </div>
    <div className='flex flex-col items-center px-10 mx-10'>
      <div className='mb-20 h-[183px] w-[181px] hover:animate-bounce'>
        <img src={icon3} alt="" />
      </div>
      <h1 className='font-bold text-2xl items-center pb-2'> Make a request</h1>
      <p className='text-lg'>Students should be able to book tutoring sessions directly through the platform.</p>
    </div>
    <div className='flex flex-col items-center px-10 mx-10 pt-20'>
      <div className='mb-20 h-[183px] w-[181px] hover:animate-bounce'>
        <img src={icon4} alt="" />
      </div>
      <h1 className='font-bold text-2xl items-center pb-2'>Setup your payment method</h1>
      <p className='text-lg'>Secure payment processing system for handling transactions between tutors and students. Support for multiple payment methods.</p>
    </div>
  </div>
</div>
<div className='flex  bg-white '>
  <img className='lg:w-1/2 md:block hidden m-5 h-[400px]' src={faq} alt="question marks" />

          <div className=' mt-5 overflow-hidden max-md:p-10'> 
          <h1 className='font-bold text-5xl mb-3 text-[#4a154b]'>FAQ</h1>
           <FAQItem question="Can I become a tutor? " answer="I'm a tutor article!
             See if you’re eligible to become a tutor with us and what the next steps are." />
             <FAQItem question="What subjects do you offer tutoring for?" answer="We offer tutoring services for a wide range of subjects, including but not limited to mathematics, science (biology, chemistry, physics), English language and literature, foreign languages, history, and computer science.
              Please contact us to inquire about specific subjects." />
             <FAQItem question="How qualified are your tutors?" answer=" Our tutors are highly qualified professionals with expertise in their respective subjects. They often hold advanced degrees or have extensive experience in teaching. We carefully vet and select tutors to ensure they have the necessary 
             qualifications and skills to provide effective tutoring." />
             <FAQItem question=" How are tutoring sessions conducted?" answer="Tutoring sessions can be conducted either in-person or online, depending on your preference. In-person sessions are held at a mutually agreed-upon location, while online sessions utilize video conferencing tools that allow for
              real-time interaction between the tutor and the student." />
               <FAQItem question=" How are tutoring sessions conducted?" answer=" Yes, we understand the importance of a good tutor-student match. While we cannot guarantee the availability of a specific tutor at all times, we strive to accommodate requests whenever possible. You can discuss your preferences with our team, and we will do 
               our best to assign a tutor who suits your needs.." />
          </div>
          </div>
   

          </>
         
          :<>
          <div className='mt-10 lg:mx-20 my-10'>
          <p className='font-serif font-bold flex justify-center items-center text-4xl text-[#4a154b] p-5'>Available Tutors</p>
          {data.length ===0 ? (<>
           
             <img src={empty} width={'200px'}className='mx-auto' alt="empty Image" />
             <p className='text-center font-bold mt-10 mb-44 text-lg text-[#4a154b]'>Sorry  no nearby tutors available at the moment </p>
            
          </>):data.map((d) => (
            
             <div onClick={()=>handleClick(d)}>
              {
                <TutorInfo  key={d.id} data={d} />
              }
             </div>
         
        ))}
          </div>
        
          </> }
          <Footer/>
        </div>
    
 </>
   )
}

 export default Home







 