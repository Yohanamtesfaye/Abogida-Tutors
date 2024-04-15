import React, { useEffect, useState } from "react";
import '../App.css';

import { Link } from "react-router-dom";

import data from '../data'

const Login = () => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);
  return (
    <>
      <div className={`bg-[#F4EDE4] lg:w-full flex justify-center py-10 lg:h-screen items-center ${fadeIn ? 'fade-in' : ''}`}>
        <div className="container mt-5 lg:flex flex-wrap justify-around w-10/12 ">
          {data.map((person, id) => (
            <Card
              key={id}
              id = {id}
              img={person.img}
              role={person.role}
              desc={person.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Card = ({ role, img, desc,id }) => {
  const UserUrl = `/UserLogin?id=${id}`;
  
  return (
    <section className="bg-white w-80 flex flex-col items-center px-6 py-6 shadow-lg">
        <img src={img} alt="cartoonimg" className="w-40 py-2" />
        <h2 className="text-2xl text-black font-bold my-2">I am {role}</h2>
        <p className="my-2 font-light text-black text-center text-sm">{desc}</p>

        <Link to={UserUrl}>


        <button   className="px-4 py-2 mt-5 ml-4 bg-[#4a154b] font-bold text-white rounded-lg ">
          {role} Login
        </button>

        </Link>
    </section>
  );
};

export default Login;
