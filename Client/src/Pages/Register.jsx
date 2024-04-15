import { Link } from "react-router-dom"
import { FaCheckCircle } from 'react-icons/fa';
import '../App.css';
import { useEffect, useState } from "react";
import logo from '../assets/logoo.png'
const Register = () => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);
  return (

     <div className={`mt-24  flex justify-center items-center ${fadeIn ? 'fade-in' : ''}`}>        

     <div className="flex rounded-xlg shadow mx-32 bg-white">
        <img className="rounded-t-lg  w-1/2 ml-10 md:block hidden" src={logo} alt="" />
        <div className="p-5  ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-20"><FaCheckCircle className='text-[#4a154b] mr-5 inline-block'/>Register As</h5>
       
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Your path to personalized learning and academic success. Register now and become a family in Abogida tutor</p>
        <div className="flex-row ml">
        <p><button className="px-4 py-2 mt-5 ml-4 bg-[#4a154b] font-bold text-white rounded-lg">
          <Link to='/studentRegistration'> <p className="px-[105px]">Client</p> </Link>      
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>          
            </button></p>
        <p><button className="px-4 py-2 mt-5 ml-4 bg-[#4a154b] font-bold text-white rounded-lg">
        <Link to='/tutorregistration'> <p className="px-[107px]">Tutor</p> </Link>          
       
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>            
        </button></p>
        </div>
       
    </div>
</div>


    </div>
   
     )
}
export default Register;