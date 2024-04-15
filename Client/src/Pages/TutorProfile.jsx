import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import  axios from 'axios';
import '../App.css';
import loading from '../assets/loadingg.gif'
import Footer from '../Comonents/Footer';
const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);  const [fadeIn, setFadeIn] = useState(false);
  const id = localStorage.getItem('id')
  const [file, setFile] = useState(null);
  const handlefile = async (e)=>{
    setFile(e.target.files[0]) 
    const formData = new FormData();
    formData.append('profile',e.target.files[0])
    const res = await axios.put(`https://tutor-website-backend.onrender.com/user/api/profile/${id}/`,formData)
    setProfileData(res.data.user)
  }
  useEffect(() => {
    // Trigger the fade in effect when the component mounts
    setFadeIn(true);
  }, []);

  const fetch =async () => {
    try{
    const res = await axios.get(`http://127.0.0.1:8000/user/api/profile/${id}/`)
    setProfileData(res.data.user)
    console.log(res.data)
    }catch(err){
      console.log(err)
    }
  }
  
  

  useEffect(()=>{
   fetch()
  },[])
  console.log(profileData)
  if (!profileData) {
    return <div className='w-full h-screen flex flex-col justify-center items-center z-10 fixed top-0 left-0 bg-[#F4EDE4] bg-opacity-1'>
    <img src={loading}  alt="" />
  </div>;
  }
  console.log('http://127.0.0.1:8000' + profileData.profile)
  return (
    <div className={`fullscreen ${fadeIn ? 'fade-in' : ''}`}>
      <div className="profile-card">
        <div className='top'>
          <div className='top1'>    
      {profileData.profile != null ?(<img className="profile-image" src={'http://127.0.0.1:8000' + profileData.profile} alt="Profile" />):<input onChange={handlefile} type='file'/>}
      </div>
      <div className='top2'>  

        <h1 className="profile-name1">{profileData.full_name}</h1>
        <p className="profile-name">Phone Number: {profileData.phone_number}</p>
        <p className="profile-name">Email: {profileData.email}</p>
        <p className="profile-name">Location: {profileData.location}</p>z
        
        </div>
           </div>

           <div className='bottom'>  
           <div className='bottom1'> 
        <p className="profile-description"><b>About me</b> <br/>{profileData.bio}</p>
        </div>
        </div>
              <div className='bottom'>
              <div className='bottom2'>
                <p className='rate'><b>Rating <br/></b></p> 
              <div className='rating'> 
              <div className='rating1'>
              <p className="profile-info"> <b>{profileData.rating}</b>/5 <br/> </p>
              <p className='proinfo'>Based on 0 Review</p>
              <span className="star-rating">&#9733;</span>
              <span className="star-rating">&#9733;</span>
              <span className="star-rating">&#9733;</span>
              <span className="star-rating">&#9733;</span>
              <span className="star-rating">&#9733;</span>
              </div>
              <div className='rating2'>
             <div className='side'> 
             <div className='side1'>
              <p className="profile-info">5</p>
              </div>
              <div className='side1'>
              <hr className="line"/> 
              </div>
            </div>
                  
            <div className='side'> 
             <div className='side1'>
              <p className="profile-info">4</p>
              </div>
              <div className='side1'>
              <hr className="line1"/> 
              </div>
            </div>

               <div className='side'> 
             <div className='side1'>
              <p className="profile-info">3</p>
              </div>
              <div className='side1'>
              <hr className="line2"/> 
              </div>
            </div>

              <div className='side'> 
             <div className='side1'>
              <p className="profile-info">2</p>
              </div>
              <div className='side1'>
              <hr className="line3"/> 
              </div>
            </div>     

              <div className='side'> 
             <div className='side1'>
              <p className="profile-info">1 </p>
              </div>
              <div className='side1'>
              <hr className="line4"/> 
              </div>
            </div>

Ruth Gdsc, [4/9/2024 11:02 AM]
</div>  
                </div>
                </div>
                       
                           <div className='bottom2'> 
                           <p className='rate'><b>Education <br/></b></p> 
                           
                            <p className="profile-infoo"> {profileData.education}</p>
                            
                          </div>
                    <div className='bottom2'> 
                    <p className='rate'><b>Grade Level <br/></b></p> 
                       <p className="profile-infooo"> {profileData.level}</p>
                          </div>
                          </div>
                          <div className='bottom'>
                         <div className='bottom2'>
                         <p className='rate'><b>Subjects <br/></b></p>
                           <p className="profile-infoo"> {profileData.subject}</p>
                             </div>
                        <div className='bottom2'>
                        <p className='rate'><b>Working Location <br/></b></p>
                        <p className="profile-infooo"> {profileData.location}</p>
                           </div>
                            <div className='bottom2'>
                            <p className='rate'><b>Working Days <br/></b></p>
                          <p className="profile-infoo"> {profileData.working_days}</p>
                          
          
          </div>
        
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProfilePage;