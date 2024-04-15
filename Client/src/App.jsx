import '@mantine/core/styles.css';
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Register from './Pages/Register'
import StudentRegistration from './Pages/StudentRegistration'
import TutorRegistration from './Pages/TutorRegistration'
import TutorDetails from './Pages/TutorDetails'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import Navbar from './Comonents/Navbar'
import Client from './Pages/Client'
import UserLogin from './Pages/UserLogin';
import { Footer } from 'antd/es/layout/layout';
import Tutor from './Pages/Tutor';
import TutorNotification from './Pages/TutorNotification';
import TutorProfile from './Pages/TutorProfile';
import TutrorNav from './Comonents/TutrorNav';
import Email from './Pages/Email';
import ClientNotification from './Pages/ClientNotification';
import Tracker from './Pages/Tracker';
import { createContext, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Prices from './Pages/Prices';
import TutorWaiting from './Pages/TutorWaiting';

export const UserInfo = createContext()

function App() {
  const [info,setInfo] = useState({username:'this is'})
  const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(apiUrl)
  return (
    <>
    <div>
      <UserInfo.Provider value={{info,setInfo}}>

     
      <MantineProvider >
      
      <Routes>
              <Route element={<Navbar />}>
                <Route path='/' element= {<Home/>}/>
                
                <Route path='/tutordetail/:id' element={<TutorDetails/>}/>
                <Route path='/prices' element={<Prices/>}/>
                <Route path='/client' element={<Client/>}/>
                <Route path='/clientnotification' element={<ClientNotification/>}/>
                
              </Route>
              <Route>
                <Route path='/register' element= {<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/studentRegistration' element= {<StudentRegistration/>}/>
                <Route path='/tutorregistration' element= {<TutorRegistration/>}/>
                <Route path='/userLogin' element={<UserLogin/>}/>
                <Route path='/userLogin፡id' element={<UserLogin/>}/>
              </Route>
              <Route element={<TutrorNav/>}>
                <Route path='/tutor' element={<Tutor/>}/>
                <Route path='/tutornotification' element={<TutorNotification/>}/>
                <Route path='/tutorprofile' element={<TutorProfile/>}/>
                <Route path='/tracker' element={<Tracker/>}/>
              </Route>
              <Route path='/email' element={<Email/>}/>
              <Route path='/waiting' element={<TutorWaiting/>}/>
        </Routes>
      </MantineProvider>
    
      </UserInfo.Provider>
    </div>
    
    </>
  )
}

export default App
