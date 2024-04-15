import React, { useEffect, useState } from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import './Registration.css'
import  axios  from 'axios';
import { questions } from '../TutorRegistration';
import location from '../assets/location.jpg'
import tutor from '../assets/tutor.png'
import resume from '../assets/Resume.jpg'
import kidner from '../assets/kidner.png'
import kids from '../assets/kids.png'
import collage from '../assets/collage.png'
import math from '../assets/math.png'
import chemistry from '../assets/chemistry.png'
import biology from '../assets/biology.png'
import { UserInfo } from '../App';       
import logo from '../assets/logoo.png'
export const TutorRegistration = () => {
    const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);
    const [file, setFile] = useState(null);
    const navigate = useNavigate()
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(questions[index])
    const [formData, setFormData] = useState({
        username: '',
        full_name:'',
        email: '',
        subject:'',
        bio:'',
        uni:'',
        education:'',
        phone_number: '',
        location: '',
        level:'',
        password: '',
        working_days:'',
    });
    const [errors, setErrors] = useState({});
    const handlefile =(e)=>{
        setFile(e.target.files[0])
        
    }
    const next = ()=> {
        // if(formData[questions[index].name] == ''){
        //     setErrors('this field has to be filled')
        //     return
        // }
        setIndex(++index)
        setQuestion(questions[index])
        setErrors(null)
    }
    const back = ()=> {
        setIndex(--index)
        setQuestion(questions[index])
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log(formData)
        const newFormData = new FormData();
      
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            newFormData.append(key, formData[key]);
          }
        }
        newFormData.append('cv',file)
        // setIsLoading(true)
        try{
            let res = await axios.post('http://127.0.0.1:8000/user/api/tutor-registration/',newFormData)
            console.log(res.data)
            let data = res.data
            if(data.user !== undefined){
            // setIsLoading(false)
            navigate('/waiting')
            
        }
        }catch(err){
            console.log(err)
            console.log(err.response.data.email[0])
            setErrors(err.response.data.email[0])
        }
        
    };

    return (
        <div className={`box px-5 ${fadeIn ? 'fade-in' : ''}`}>
            
        <form className="form-container" onSubmit={handleSubmit}>
        <div className='flex justify-center items-center'>
               <img src={logo} width={'200px'}alt=""  />
            </div>
            {index > 0 && <p className='mt-10 underline font-bold ' onClick={back}> Back</p>}
            <div className='flex justify-center items-center mt-10 lg:text-2xl text-lg font-bold mb-4'> <p>{question.question}</p></div>
           {question.name !== "location"&& question.type !== 'file' && question.name !=='full_name' && question.name !=='level' && question.name!== 'subject'&&<input
                className='hover:shadow-sm hover:shadow-[#4a154b] '
                    type={question.type}
                    name={question.name}
                    placeholder={question.placeholder}
                    autoComplete='off'
                    onChange={handleChange}
                    value={formData[questions[index].name]}
                    required
                />}
                 {question.name === "location" ? (<>
                    <img src={location}  width={'150px'} className='lg:ml-72 ml-24'/>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <select name={question.name} onSelect={handleChange} onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 lg:px-72 ml-3 py-2 mb-5 rounded-lg ' id="">
                            <option value="">Location</option>
                            <option value="kality">Addis Ababa Kality</option>
                            <option value="saris">Addis Ababa Saris</option>
                            <option value="bole">Addis Ababa Bole</option>
                            <option value="megenagna">Addis Ababa Megenagn</option>
                            <option value="gotera">Addis Ababa Gotera</option>
                         </select>
                </>) : null}
                {question.name === "subject" ? (<>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <div>
                        <select name={question.name} onSelect={handleChange} onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 lg:px-72 ml-3 py-2 mb-5 rounded-lg ' id="">
                            <option value="">Subject</option>
                            <option value="All">All</option>
                            <option value="English">English</option>
                            <option value="Maths">Maths</option>
                            <option value="General Science">General Science</option>
                            <option value="Social Studies">Social Studies</option>
                         </select>
                    </div>
                <div className=' p-14 grid grid-cols-3 gap-16'>
                    <img src={chemistry}  width={'200px'}/>
                    <img src={math}  width={'200px'}/>  
                    <img src={biology}  width={'150px'} />
                    
                </div>
                
                </>) : null}
                {question.name === "level" ? (<>
                    <div>
                        <select name={question.name} onSelect={handleChange} onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 lg:px-72 ml-3 py-2 mb-5 rounded-lg ' id="">
                            <option value="">level</option>
                            <option value="kindergarten">kindergarten</option>
                            <option value="low">Grade 1 - Grade 4</option>
                            <option value="mid">Grade 5 - Grade 8 </option>
                            <option value="high">Grade 9 - Grade 12</option>

                         </select>
                    </div>
                <div className=' p-14 lg:grid grid-cols-3 gap-16'>
                    <div className=' text-center shadow-lg p-10 rounded-xl my-10 '>
                        <img src={kidner} width={100} height={100} className='max-w-full max-h-full mx-auto' />
                        <h3 className='text-lg font-medium pt-8 pb-2'>kindergarten</h3>
                    </div>
                    <div className=' text-center shadow-lg p-10 rounded-xl my-10 '>
                        <img src={kids} width={100} height={100} className='max-w-full max-h-full mx-auto' />
                        <h3 className='text-lg font-medium pt-8 pb-2'>Elementary</h3>
                    </div>
                    <div className=' text-center shadow-lg p-10 rounded-xl my-10 '>
                        <img src={collage} width={100} height={100} className='max-w-full max-h-full mx-auto' />
                        <h3 className='text-lg font-medium pt-8 pb-2'>High School</h3>
                    </div>
                </div>
                </>) : null}
                {question.type === "file" ? (<>
                    <img src={resume}  width={'150px'} className='lg:ml-72 ml-20'/>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <input
                        className='hover:shadow-sm hover:shadow-[#4a154b] '
                        type={question.type}
                        name={question.name}
                        placeholder={question.placeholder}
                        autoComplete='off'
                        onChange={handlefile}
                        value={formData[questions[index].name]}
                        required
                />  
                </>) : null}
                {question.name === "full_name" ? (<>
                <img src={tutor} width={'150px'} className='lg:ml-72 ml-20'/>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <input
                        className='hover:shadow-sm hover:shadow-[#4a154b] '
                        type={question.type}
                        name={question.name}
                        placeholder={question.placeholder}
                        autoComplete='off'
                        onChange={handleChange}
                        value={formData[questions[index].name]}
                        required
                />  
                </>) : null}
                
             <p id='button' className='mt-10 flex justify-center items-center font-bold' onClick={index < questions.length - 1 ? next:handleSubmit}>{index < questions.length - 1 ?'Next':'Submit'}</p>
           <p id='p1'>Question {index + 1} of {questions.length} Questions</p>
        </form>
        </div>
    );
};
export default TutorRegistration;