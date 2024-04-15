import React, { useEffect, useRef, useState } from "react";
import image2 from "../assets/i2r.png";
import {useNavigate} from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';
import data from "../data";
import axios  from "axios";
import '../App.css';
const UserLogin = () => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);
    const params = new URLSearchParams(document.location.search);
    const currentUser = data[params.get("id")]
    const [errors, setErrors] = useState(null);
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()

    let handleSubmit = async (e) => {
      e.preventDefault()

      let formData = {
        email:email.current.value,
        password:password.current.value,
      }
      console.log(data)
      try{
        

        let res = await axios.post('http://127.0.0.1:8000/user/api/login/',formData)
        console.log(res.data)
        let data = res.data
        console.log(data)
        if(data.user !== undefined){
        localStorage.setItem('username',data.user.username)
        localStorage.setItem('full_name',data.user.full_name)
        localStorage.setItem('email',data.user.email)
        localStorage.setItem('id',data.user.id)
        localStorage.setItem('isVerified',true)
        localStorage.setItem('isTutor',data.user.role != "P")
        // setIsLoading(false)
        data.user.role != "P" ? navigate('/tutor') : navigate('/')
        }
      }catch (err){
            console.log("err")
            setErrors(err.response.data.detail)
      }
   
    }
      
  return (
    <>
      <div className={`bg-[#F4EDE4] h-screen font-family-karla flex flex-col justify-center items-center ${fadeIn ? 'fade-in' : ''}`}>
        <div className="bg-[#fff] lg:w-3/5 flex flex-col h-11/12 p-5 ">
          <p className="text-center text-4xl">Welcome {currentUser.role}</p>
          <div className=" lg:flex flex-row justify-around items-center">
            <div className="lg:w-1/3 lg:flex justify-center">
              <div className="">
                <img  src={currentUser.img} alt="people" />
                <p className="text-center text-3xl font-bold text-black p-3">I am a {currentUser.role}</p>
                <div className=" text-center text-base text-black p-1">{currentUser.desc}</div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col">
              
              <form
              onSubmit={handleSubmit}
                className="flex flex-col pt-3 md:pt-8"
              >
                <div className="flex flex-col pt-4">
                  <label  className="text-sm m-2">
                    Email
                  </label>
                  <input
                    ref={email}
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="p-2 rounded bg-[#d5ded8] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label  className="text-sm m-2">
                    Password
                  </label>
                  <input
                    ref={password}
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="rounded bg-[#d5ded8] focus:outline-none py-2 px-3 "
                  />
                </div>

                <input
                  type="submit"
                  value="Log In"
                  className="bg-[#96daa8] text-white font-bold text-lg hover:bg-[#60cc7d] p-2 mt-8"
                />
              </form>
              {errors && (
                <p className='text-red-800 text-sm'>*{errors}</p>
            )}
              <div className="flex justify-between  pt-6 pb-8">
                
                <Link to={{pathname: "/Register",}}>
                    <button className="text-black hover:underline hover:text-blue-500">
                        create account
                    </button>
                </Link>
                <Link className="text-center text-blue-500 underline">
                    forget pasword ?
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UserLogin;
