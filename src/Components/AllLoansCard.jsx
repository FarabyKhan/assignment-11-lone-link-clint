import React from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { PiSealPercentFill } from "react-icons/pi";
import { TbMoneybag } from "react-icons/tb";

const AllLoansCard = ({loan}) => {
    const{image, title, category ,interestRate ,maxLoanLimit} = loan
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm border border-gray-300 hover:scale-105
         transition ease-in-out rounded-xl ">
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
</span>Max Loan Limit: <span className='badge badge-secondary font-bold'>{maxLoanLimit}TK</span></p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary my-4">View Details</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default AllLoansCard;