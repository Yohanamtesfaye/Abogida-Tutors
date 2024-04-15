import React, { useEffect, useState } from 'react';
import {Link, redirect, useNavigate} from 'react-router-dom';
import './Registration.css'
import axios from 'axios';
import { questions } from '../aboutmequestions';
import loading from '../assets/loadingg.gif';
import student from '../assets/student2.png'
import parent from '../assets/parent.png'
import math from '../assets/math.png'
import chemistry from '../assets/chemistry.png'
import kidner from '../assets/kidner.png'
import kids from '../assets/kids.png'
import biology from '../assets/biology.png'
import collage from '../assets/collage.png'
import location from '../assets/location.jpg'
import '../App.css';
import logo from '../assets/logoo.png'

export const StudentRegistration = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(questions[index])
    const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);


    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        full_name:'',
        email: '',
        phone_number: '',
        location: '',
        subject:'',
        level:'',
        password: '',
        role: '',

    });
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
        console.log(name)
        setFormData({
            ...formData,
            [name]: value
        });
    };
    

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log(formData)
        setIsLoading(true)
        try{
            let res = await axios.post('http://127.0.0.1:8000/user/api/studentRegistration/',formData)
            console.log(res.data)
            let data = res.data
            if(data.user !== undefined){
                localStorage.setItem('email',data.user.email)
            setIsLoading(false)
            navigate('/email')
        }
        }catch(err){
            console.log(err)
            setIsLoading(false)
            const text = String(err.response.data.error);
            console.log(text.toLowerCase().includes('email'))
            if(text.toLowerCase().includes('email')){
                console.log("email error")
                setIndex(6)
                setQuestion(questions[6])
            }
            // console.log(err.response.data.email[0])
            setErrors(err.response.data.error)
        }
        
    };
    console.log(question)
    return (
        <div className={`box mt-32 relative mx-6 ${fadeIn ? 'fade-in' : ''}`}>
            
        <form className="form-container" onSubmit={handleSubmit}>
            <div className='flex justify-center items-center'>
               <img src={logo} width={'200px'}alt=""  />
            </div>
            {index > 0 && <p className='mt-10 underline font-bold ' onClick={back}> Back</p>}
            {question.type === "text" ?( <div>
                <div className='flex justify-center items-center  lg:text-2xl font-bold mb-4'> <p>{question.question}</p></div>
                {question.name !== "subject" && question.name !== "level"&& question.name !== "location"&&<input
                className='hover:shadow-sm hover:shadow-[#4a154b] '
                    type={question.type}
                    name={question.name}
                    placeholder={question.placeholder}
                    autoComplete='off'
                    onChange={handleChange}
                    value={formData[questions[index].name]}
                    required
                />}
                {question.name === "subject" ? (<>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <div>
                        <select name={question.name} onSelect={handleChange} onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 lg:px-72 max-md:px-16 lg:ml-3 py-2 mb-5 rounded-lg ' id="">
                            <option value="">Subject</option>
                            <option value="All">All</option>
                            <option value="English">English</option>
                            <option value="Maths">Maths</option>
                            <option value="General Science">General Science</option>
                            <option value="Social Studies">Social Studies</option>
                         </select>
                    </div>
                <div className=' flex px max-md:w-20 w-44'>
                    <img src={chemistry}  />
                    <img src={math} className='lg:ml-20 ml-5' />  
                    <img src={biology} className='lg:ml-20 ml-5'   />
                    
                </div>
                
                </>) : null}
                {question.name === "level" ? (<>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <div>
                        <select name={question.name} onSelect={handleChange} onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600 max-md:px-16 lg:px-72 ml-3 py-2 mb-5 rounded-lg ' id="">
                            <option value="">level</option>
                            <option value="kindergarten">kindergarten</option>
                            <option value="Grade 1">Grade 1</option>
                            <option value="Grade 2">Grade 2</option>
                            <option value="Grade 3">Grade 3</option>
                            <option value="Grade 4">Grade 4</option>
                            <option value="Grade 5">Grade 5</option>
                            <option value="Grade 6">Grade 6</option>
                            <option value="Grade 7">Grade 7</option>
                            <option value="Grade 8">Grade 8</option>
                            <option value="Grade 9">Grade 9</option>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>

                         </select>
                    </div>
                <div className=' p-14 lg:grid grid-cols-3 gap-16'>
                    <div className=' text-center shadow-lg p-10 rounded-xl my-10 '>
                        <img src={kidner} width={100} height={100} className='max-w-full max-h-full mx-auto' />
                        <h3 className='text-lg font-medium pt-8 pb-2'>kindergarten</h3>
                    </div>
                    <div className=' text-center shadow-lg p-10 rounded-xl my-10 '>
                        <img src={kids} width={100} height={100} className='max-w-full max-h-full mx-auto' />
                        <h3 className='text-lg font-medium pt-8 pb-2'>elementary</h3>
                    </div>
                    <div className=' text-center shadow-lg p-10 rounded-xl my-10 '>
                        <img src={collage} width={100} height={100} className='max-w-full max-h-full mx-auto' />
                        <h3 className='text-lg font-medium pt-8 pb-2'>High School</h3>
                    </div>
                </div>
                </>) : null}
                {question.name === "location" ? (<>
                    <img src={location}  width={'150px'} className='lg:ml-72 ml-16 md:ml-60'/>
                    <p className='text-center leading-8 text-gray-600 font-bold max-w-md block mx-auto'>{question.des}</p>
                    <select name={question.name} onSelect={handleChange} onChange={handleChange} className='inline-block bg-gray-100 border mt-5 font-bold text-gray-600  lg:px-72 ml-3 py-2 mb-5 rounded-lg ' id="">
                            <option value="">Location</option>
                            <option value="kality">Addis Ababa Kality</option>
                            <option value="saris">Addis Ababa Saris</option>
                            <option value="bole">Addis Ababa Bole</option>
                            <option value="megenagna">Addis Ababa Megenagn</option>
                            <option value="gotera">Addis Ababa Gotera</option>
                         </select>
                </>) : null}

            </div>):(
                <>
                 <div>
                 <div className='flex justify-center items-center mt-3 lg:text-4xl text-xl font-bold mb-4'><p>{question.question}</p></div>
                    <div>
                        <label className='border inline-flex items-center border-[#4a154b] p-5 ' id='p'>
                            <input
                                type="radio"
                                name="role"
                                value="P"
                                checked={formData.role === 'P'}
                                onChange={handleChange}
                                required
                            />
                             <div className='inline-flex'>
                                <div><p className='ml-2 mt-10  text-gray-900'>Parent</p></div>       
                                <div className='ml-'><img src={parent} width={'100px'} /></div>
                            </div>
                        </label>
                        <label className='border inline-flex items-center border-[#4a154b] p-5 ' id='s'>
                            <input
                                type="radio"
                                name="role"
                                value="S"
                                checked={formData.role === 'S'}
                                onChange={handleChange}
                            />
                            <div className='inline-flex'>
                                <div><p className='ml-2 mt-10  text-gray-900'>Student</p></div>       
                                <div className='ml-'><img src={student} width={'100px'} /></div>
                            </div>
                            
                        </label>
                    </div>
                </div>
                </>
            )
            }
            {errors && (
                <p className='text-red-800 text-sm'>*{errors}</p>
            )}
            <p id='button' className='mt-10 flex justify-center items-center font-bold' onClick={index < questions.length - 1 ? next:handleSubmit}>{index < questions.length - 1 ?'Next':'Submit'}</p>
           
            <p id='p1'>Question {index + 1} of {questions.length} Questions</p>
            {/* <p id='p1'>Already have an account?<Link  id='Link'to="/login">Login</Link> </p> */}
        </form>
        {isLoading && (
            <div className='w-full h-screen flex flex-col justify-center items-center z-10 fixed top-0 left-0 bg-[#F4EDE4] bg-opacity-1'>
                <img src={loading} alt="" />
            </div>
        )}
        </div>
    );
}; 
export default StudentRegistration;