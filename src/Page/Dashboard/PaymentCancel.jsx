import React from 'react'
import error from '../../assets/Error.json'
import Lottie from 'lottie-react'
import { Link } from 'react-router'
const PaymentCancel = () => {

  


  return (
    <div className='flex flex-col justify-center bg- items-center min-h-screen px-4 text-center'>
        <div className=' bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative space-y-4 '>
             <Lottie
        animationData={error}
        loop={false}
        className='w-full max-w-[300px] h-[150px] mx-auto'
        >

        </Lottie>
            <h1 className='text-4xl font-bold text-error'>Payment Cancelled!</h1>

            <p className='text-sm text-gray-500'>Your transaction was Cancelled. Please return to Dashboard</p>

        <Link to={'/dashboard'} className='btn btn-error my-3 mb-20 border-none'>Back To Your Dashboard</Link>
        </div>
      
    </div>
  )
}

export default PaymentCancel
