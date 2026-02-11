import React from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { PiSealPercentFill } from "react-icons/pi";
import { TbListDetails, TbMoneybag } from "react-icons/tb";
import { Link } from 'react-router';

const AllLoansCard = ({loan}) => {
    const{image, title, category ,interestRate ,maxLoanLimit} = loan || []

    const convert=(number)=>{

    if(number>=1000000)
        return ( number/1000000 ) + 'M'

    else if(number>=1000)
        return (number/1000) + 'K'

    return number
    }

    return (
        <div>
            <div className="card bg-base-100 w-9/12 shadow-sm border border-gray-300 hover:scale-105
         transition ease-in-out rounded-xl p-3">
  <figure>
    <img
      src={image}
      alt={title} className='w-full h-[250px] rounded-xl' 
      />
  </figure>
  <div className="card-body space-y-3">
    <h2 className="card-title text-2xl text-primary">{title}</h2>
    <p className=' text-sm flex items-center gap-2'><span className='text-lg'><BiSolidCategory /></span>Category: <span className='text-red-600 font-bold'>{category}</span></p>
    <p className=' text-sm flex items-center gap-2'><span className='text-xl'><PiSealPercentFill /></span>Interest Rate: <span className='font-bold'>{interestRate}%</span></p>
    <p className=' text-sm flex items-center gap-2'><span className='text-xl'><TbMoneybag />
</span>Max Loan Limit: <span className='badge badge-secondary font-semibold'>{convert(maxLoanLimit)} TK</span></p>
    <div className="card-actions justify-center mt-10 mb-5">
          <Link to={`/loan-details/${loan._id}`} className='btn btn-secondary w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out  hover: shadow-lg hover:scale-[1.02] hover:bg-green-300'><span><TbListDetails /></span>View Details</Link>
        </div>
  </div>
</div>
        </div>
    );
};

export default AllLoansCard;