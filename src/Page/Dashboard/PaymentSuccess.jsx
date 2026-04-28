import Lottie from 'lottie-react'
import React, { useEffect } from 'react'
import success from '../../assets/success.json'
import confetti from '../../assets/Confetti.json'
import { Link, useSearchParams } from 'react-router'
import useAxiosSecure from '../../useHooks/useAxiosSecure'
const PaymentSuccess = () => {

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  console.log(sessionId);
  
  const axiosSecure = useAxiosSecure()

  useEffect(()=>{
    if(sessionId){
     axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
     .then(res=>{
      console.log(res.data);
      
     })
    }
  },[axiosSecure,sessionId])

  return (
    <div  className='flex flex-col justify-center bg- items-center min-h-screen px-4 text-center'>
      <div className=' bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative space-y-4 '>
        <Lottie
        animationData={success}
        loop={false}
        className='w-full max-w-[300px] mx-auto'
        >

        </Lottie>
            <h1 className='text-4xl font-bold text-success'>Payment Succeeded!</h1>

            <p className='text-sm text-gray-500'>Your transaction was completed successfully. Thank you for your purchase!</p>

        <Link to={'/dashboard'} className='btn btn-primary my-3 mb-20 border-none'>Back To Your Dashboard</Link>

        <Lottie
        animationData={confetti}
        loop={false}
        style={{width:400, height:200}}
        className='absolute top-[50%] sm:top-[55%] left-1/2 -translate-x-1/2 w-[120%] max-w-[400px] pointer-events-none'
        >

        </Lottie>
        </div>
    </div>
  )
}

export default PaymentSuccess
