import React, { useEffect, useState } from 'react';
import LoadingAm from './Utility/LoadingAm';
import { Link,  useNavigate,  useParams } from 'react-router';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAuth from '../useHooks/useAuth';
import useAxiosSecure from '../useHooks/useAxiosSecure';

const LoanDetails = () => {

    const { _id } = useParams()
    const [loading, setLoading] = useState(false)
    const [loan, setLoan] = useState({})
    const { user } = useAuth()
    const [role, setRole] = useState(null);
    const [roleLoading , setRoleLoading] =useState(true)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        setLoading(true)
        axiosSecure.get(`/loans/${_id}`)
            .then(res => {
                // console.log(data)
                setLoan(res.data)
                setLoading(false)
            })
    }, [_id,axiosSecure])

    useEffect(()=>{
        if(user?.email){
            axiosSecure.get(`/users/${user.email}`)
            .then(res=> {
                setRole(res.data?.role)
                setRoleLoading(false)
            })
        } else{
            setRoleLoading(false);
        }
    },[user,axiosSecure])

    const convert=(number)=>{

    if(number>=1000000)
        return ( number/1000000 ) + 'M'

    else if(number>=1000)
        return (number/1000) + 'K'

    return number
    }

    if (loading || roleLoading)
        return <LoadingAm></LoadingAm>

    const{image, title, category ,interestRate ,maxLoanLimit, description, emiPlans,} = loan || {}

    const isDisabled= !user || role === "admin" || role === "manager" ;

    return (
        <div className='my-5 min-h-screen ml-20'>
            <div className='flex flex-col md:flex-row justify-center items-center bg-base-100 shadow-sm'>
            <figure>
                <img src={image}
                 alt={title}
                 className='h-80 w-120 object-fill rounded-xl mb-70' />
            </figure>
            <div className='flex flex-col w-11/12 md:w-4/12 items-center space-y-3 my-20'>
                
                    <h2 className='card-title text-3xl text-secondary font-bold'>{title}</h2>
                    <div className='my-10 space-y-5'>
                       <p className=' text-xl flex items-center gap-2'><span><img src="/category.png" className='h-8 w-8' alt="" /></span>Category: <span className='text-red-600 font-bold'>{category}</span></p>

                       <p className='text-xl flex gap-2'>
                            <span><img src="/interest-rate.png" className='h-7 w-7' alt="" /></span>Interest Rate: <span className='font-bold'>{interestRate}%</span>
                       </p>

                       <p className='text-xl flex items-center gap-1'>
                        <span><img src="/max-loan.jpg" className='h-10 w-8' alt="" /></span> Max Loan Limit: <span className='font-bold text-primary'>{convert(maxLoanLimit)}</span>
                       </p>
                       <p className='text-2xl mt-10 ml-10 font-semibold text-primary '>
                            Available EMI Plans
                       </p>
                       
                    </div>
                    <div className='bg-blue-200 p-5 rounded-4xl w-120 shadow-xl'>
                        <div className=' w-full mt-4 space-y-3'>
                            {
                                emiPlans?.map((plan, index)=>(
                                    <div key={index} className='flex justify-center gap-4 items-center my-5  p-3 rounded-lg bg-blue-50 cursor-pointer transition-all duration-300 ease-in-out hover: shadow-lg hover:scale-[1.02] '>
                                    <span className='font-medium'>EMI Duration: {plan.months} Months</span>
                                    <span className='font-semibold flex items-center text-secondary'>Amount: <TbCurrencyTaka className='text-xl' /> {plan.monthlyAmount} / month</span>
                                    </div>
                                ))
                            }
                        </div>
                       </div>

                       <div className='mt-6'>
                        <button onClick={()=> navigate(`/loan-apply/${_id}`)}
                        disabled={isDisabled}
                        className={`btn w-120 rounded-lg font-semibold  transition-all duration-300 text-white ${isDisabled?'bg-accent cursor-not-allowed' : 'bg-primary hover:bg-secondary'}`}>
                            
                            Apply Now 
                        </button>
                       </div>
                       
            </div>
                      
            </div>
                     <div className='my-10 space-y-5'>
                        <h2 className='text-3xl font-semibold text-accent'>Description:</h2>
                        <p className='text-accent'>{description}</p>
                       </div>

        </div>
    );
};

export default LoanDetails;