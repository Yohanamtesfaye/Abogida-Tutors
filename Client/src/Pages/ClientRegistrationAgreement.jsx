import React from 'react'

const ClientRegistrationAgreement = () => {
  return (
    <div>
      <h1 className='font-bold text-3xl '>This Agreement is made and entered into as of [Date], by and between [Party A], located at [Address], and Abogida Tutor, located at Addis Ababa.</h1>
      <p className='font-bold text-3xl'>Terms </p>
      <p>This contract dictates that starting from [date], tutorName will be subject to a service fee ranging between 7% and 15%, depending on the total payment amount. Specifically:
- Payments exceeding 5000 ETB will incur a 15% fee.
- Payments ranging from 3000 ETB to 5000 ETB will incur a 10% fee.
- Payments ranging from 1000 ETB to 3000 ETB will incur a 7% fee.
- Payments below 1000ETB will not incur any fee.
This agreement also outlines the accepted payment methods, which include:
- CBE: 10003982381939
- Telebirr: 090909090
- Awash Bank: 109201902901
      </p>
      <button className='px-4 py-2 mt-5 ml-4 bg-[#4a154b] font-bold text-white rounded-lg hover:text-[#4a154b] border hover:bg-white'>I Agree</button>
    </div>
  )
}

export default ClientRegistrationAgreement