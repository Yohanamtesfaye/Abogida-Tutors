// on tutorNav page

import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Badge } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import TutorNotification from "../Pages/TutorNotification";
import logo from '../assets/logo.jpg'
const TutrorNav = () => {
  const [notification, setNotification] = useState([]);
  const [notify, setNotify] = useState(false);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('full_name');
    localStorage.removeItem('email');
    localStorage.removeItem('isVerified');
    navigate('/login');
  };
  const fetch = async () => {
    const id = localStorage.getItem('id')
    try{
        const ress = await axios.get(`http://127.0.0.1:8000/core/api/tutor/dashboard/${id}/tutor-notifications/`)
        console.log(ress.data)
        setNotification(ress.data);

    }catch(err){
        console.log(err);
    }
  }
  useEffect(() => {
   fetch()  
  }, []);

  const unreadCount = notification.length


  return (
    <div className="relative">
      <div
        className="flex justify-between p-5 bg-white"
        onClick={() => {
          notify && setNotify(!notify);
        }}
      >
        <div><img src={logo} alt="logo" width={'100px'} /></div>
        <div className="flex px-10">
          <Link to="/tutor" className="text-[#4a154b] font-bold hover:text-gray-200 mr-6">
            Home
          </Link>
          <Link to="/tracker" className="text-[#4a154b] font-bold hover:text-gray-200 mr-6">
            Tracker
          </Link>
          <Badge
            className="flex flex-col items-end text-4xl text-[#4a154b]  mr-10"
            count={unreadCount}
            onClick={() => setNotify(!notify)}
          >
            <FaBell />
          </Badge>

          <Link to="/tutorprofile" className="text-4xl text-[#4a154b]mr-6">
            <AiOutlineUser />
          </Link>
          <p onClick={handleLogout} className='bg-[#4a154b] text-white font-bold border border-[#4a154b] px-6 hover:text-[#4a154b] hover:bg-white rounded-lg'>Logout</p>
        </div>
      </div>

      {notify && (
        <div className="absolute top-5 right-0 mt-10 z-10 max-h-screen overflow-y-auto ">
            <TutorNotification
            notification={notification}
            setNotification={setNotification}
            fetch={fetch}
          />
        </div>
      )}
      <div
        onClick={() => {
          notify && setNotify(!notify);
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default TutrorNav;
