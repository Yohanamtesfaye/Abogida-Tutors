
import React, { useState, useEffect } from 'react';
import './profileForm.css'; // Import the CSS file

import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/Button';
import Avatar from 'react-avatar-edit'

const ProfileForm = () => {
  const [image, setImage] = useState({})
  const [imageCrop, setimageCrop] = useState(false);

 const [src, setsrc] = useState(false)
 const [profile, setprofile] = useState([]);
 const [pview, setpview] = useState(false)

 const profileFinal = Array.isArray(profile) ? profile.map(item => item.pview) : [];


 const onClose = () => {
  setpview (null)
 }

 const onCrop =(view) =>{
  setpview(view)
 }
 const saveCropImage =() => {
  setprofile([...profile, {pview}])
  setimageCrop(false)
 }
  
  let [formData, setFormData] = useState({
    name:  '',
    image: '',
    description: '',
    email: '',
    location: '',
    rating: '',
    phoneNumber: '',
    education: '',
    gradeLevel: '',
    subjects: '',
    workingLocation: '',
    workingDays: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform data validation
    // const isFormValid = Object.values(formData).every((value) => value !== '');
    // if (!isFormValid) {
    //   alert('Please fill in all the required fields.');
    //   return;
    // }

    // Make the API request to save the user data
    fetch('http://localhost:3031/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        alert('Profile saved successfully!');
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred. Please try again.');
      });
  };

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3031/profile')
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <div className='flex justify-between mt-20 bg-white mx-5 rounded-sm'>
      {/* first div */}
     
     <div className='ml-20 mr-0'>
     <img  className=" rounded-full w-40 h-30 flex justify-center mt-10  "
        src={profileFinal.length ? profileFinal: profileData.image} alt="Profile" 
        
        onClick={() => setimageCrop(true)}/>

<div >
          <label className='ml-9' htmlFor="name">{profileData.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}  
            onChange={handleInputChange}
          
          />
        </div>
       
        <Dialog  
        
       visible={imageCrop}
       header= {()=>(
        <p htmlFor= "" className='text-2xl font-semibold textColor'>Update profile</p>
  )} 
  footer= {()=>(
    <div  className= 'flex flex-col text-center   w-12 p-4 '>
    <div className='flex justify-around w-12 mt-4 '>
      <Button
      onClick={saveCropImage}
      label="Save"
     className="bg-green-600 text-white "
     icon="pi pi-check"
      autoFocus
      />
    
    </div>
  </div>
)} 
       onHide={() => setimageCrop(false)}
  >
           
           <div className='confirmation content flex flex-column align-items-center bg-gray-500'>
                        <Avatar 
                            width={500}
                            height={400}
                            onCrop={onCrop}
                            onClose={onClose}
                            src={src}
                            shadingColor={"#474649"}
                            backgroundColor={ "#474649"}
                            />
                           
                          </div>
                      </Dialog>

         <InputText 
       type='file'
       accept= "image/*" 
       style={{display :'none'}}
       onChange={(event)=>{
         const file =event.target.files[0];
         if(file && file.type.substring(0,5)==="image"){
          setImage(file);
         }else{ setImage(null)
         }
       }}
       />
        <div>
          <label className='ml-2' htmlFor="email"> </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder={profileData.email}
            onChange={handleInputChange}
            
          />
        </div>
       </div>
        

      {/* second div */}
      <div className=" mr-20 ">
     <div className='flex justify-between my-5 font-bold'>
        <h2>back</h2>
        <h2>Edit Profile</h2>
       </div>
      <form onSubmit={handleSubmit}>
       
          <div className='grid grid-cols-2 '> 
          <div className='mb-10 border-solid '>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder={profileData.phoneNumber}
            onChange={handleInputChange}
            
          />
        </div>
        <div className='mb-10'>
          <label htmlFor="location">Location:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="text"
            id="location"
            name="location"
            value={formData.location}
            placeholder={profileData.phoneNumber}
            onChange={handleInputChange}
            
          />
        </div>

        <div className='mb-10'>
          <label htmlFor="description">Description:</label>
          <textarea
          className='border border-gray-300 rounded text-black w-full px-2 py-1'
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            
          />
        </div>
 
        <div className='mb-10'>
          <label htmlFor="education">Education:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="text"
            id="education"
            name="education"
            value={formData.education}
            placeholder={profileData.education}
            onChange={handleInputChange}
            
          />
        </div>

Ruthh Gdsc, [4/8/2024 11:36 PM]
<div className='mb-10'>
          <label htmlFor="gradeLevel">Grade Level:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="text"
            id="gradeLevel"
            name="gradeLevel"
            value={formData.gradeLevel}
            placeholder={profileData.gradeLevel}
            onChange={handleInputChange}
            
          />
        </div>


        <div className='mb-10'>
          <label htmlFor="subjects">Subjects:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="text"
            id="subjects"
            name="subjects"
            value={formData.subjects}
            placeholder={profileData.subjects}
            onChange={handleInputChange}
            
          />
        </div>


        <div className='mb-10'>
          <label htmlFor="workingLocation">Working Location:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="text"
            id="workingLocation"
            name="workingLocation"
            value={formData.workingLocation}
            placeholder={profileData.workingLocation}
            onChange={handleInputChange}
           
          />
        </div>


        <div className='mb-10'>
          <label htmlFor="workingDays">Working Days:</label>
          <input
           className='border border-gray-300 rounded text-black w-full px-2 py-1'
            type="days"
            id="workingDays"
            name="workingDays"
            value={formData.workingDays}
            placeholder={profileData.workingDays}
            onChange={handleInputChange}
            
          />
        </div>
        <div></div>
          <button className='bg-[#e66dd5] px-1 py-2 my-2 hover:bg-[#ad3f92] ' type="submit">Save Profile</button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
};

export default ProfileForm;