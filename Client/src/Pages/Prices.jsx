import React, {useState, useEffect} from 'react';
import pre from '../assets/pre.jpeg';
import el from '../assets/el.jpg';
import m from '../assets/m.png';
import c2 from '../assets/c2.jpeg';
import g from '../assets/g.jpeg';
import i8 from '../assets/i8.jpeg';
import i12 from '../assets/i12.jpg';
import '../App.css';
import Footer from '../Comonents/Footer';

export const Prices = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
      // Trigger the fade in effect when the component mounts
      setFadeIn(true);
    }, []);

  return (
    <>
    <div className='bg-[#F4EDE4]'>
      <div className=' flex flex-col py-10 mx-10'>
        <div className='flex justify-center font-serif font-bold text-4xl mb-5 p-3 text-[#4a154b]'>Prices Per Hour</div>
        {/* Upper 4 columns */}
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-10 ${fadeIn ? 'fade-in' : ''}`}>
          <div className='flex shadow-lg p-5 rounded-xl bg-white  '>
            <div>
              <img src={pre} alt='preschool' className='rounded-xl h-[100px] pl-3' />
            </div>
            <div className='mt-16 ml-2'>
              <div className='mt-5 text-2xl font-serif  w-[135px]'>Preschool</div>
              <div className='mb-2 font-bold'>💵 170 birr/ hr</div>
              <div className='mb-2 font-bold  '>📚 Below Grade 1 </div>
            </div>
          </div>
          
          <div className='flex shadow-lg p-5 rounded-xl bg-white'>
            <div>
              <img src={el} alt='preschool' className='rounded-xl h-[100px] pl-3' />
            </div>
            <div className='mt-16'>
              <div className='mt-5 text-2xl font-serif  w-[135px]'>Elementary</div>
              <div className='mb-2 font-bold'>💵 200 birr/ hr</div>
              <div className='mb-2 font-bold  '>📚 Grade 1 - 4</div>
            </div>
          </div>
          <div className='flex shadow-lg p-5 rounded-xl bg-white'>
            <div>
              <img src={m} alt='preschool' className='rounded-xl h-[100px] pl-3' />
            </div>
            <div className='mt-16'>
              <div className='mt-5 text-2xl font-serif   w-[135px]'>Middle</div>
              <div className='mb-2 font-bold '>💵 250 birr/ hr</div>
              <div className='mb-2 font-bold  '>📚 Grade 5 - 7</div>
            </div>
          </div>
          <div className='flex shadow-lg p-5 rounded-xl bg-white'>
            <div>
              <img src={c2} alt='preschool' className='rounded-xl  h-[100px] pl-3' />
            </div>
            <div className='mt-16'>
              <div className='mt-5 text-2xl font-serif   w-[135px]'>High</div>
              <div className='mb-2 font-bold  '>💵 320 birr/ hr</div>
              <div className='mb-2 font-bold  '>📚 Grade 9 - 11</div>
            </div>
          </div>
        </div>
        {/* Lower 3 columns */}
        <div className={`grid grid-cols-1 ml-96 mt-10 gap-8 md:grid-cols-2 lg:grid-cols-3 ${fadeIn ? 'fade-in' : ''}`}>
          <div className='flex shadow-lg p-5 rounded-xl bg-white'>
            <div>
              <img src={i8} alt='preschool' className='rounded-xl h-[100px] pl-3' />
            </div>
            <div className='mt-16 '>
              <div className='mt-5 text-2xl font-serif   w-[135px]'>Grade 8</div>
              <div className='mb-5 font-bold'>💵 300 birr/ hr</div>
            </div>
          </div>
          <div className='flex shadow-lg p-5 rounded-xl bg-white'>
            <div>
              <img src={i12} alt='preschool' className='rounded-xl h-[100px] pl-3' />
            </div>
            <div className='mt-16'>
              <div className='mt-5 text-2xl font-serif   w-[135px]'>Grade 12</div>
              <div className='mb-5 font-bold'>💵 350 birr/ hr</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Prices;

