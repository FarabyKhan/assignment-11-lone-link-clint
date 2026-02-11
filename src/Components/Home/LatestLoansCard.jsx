import React from 'react';
import { TbListDetails } from "react-icons/tb";
import { Link } from 'react-router';


const LatestLoansCard = ({loan}) => {
    const {image, title, shortDescription,maxLoanLimit} = loan || []

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
      alt={title}  className='h-[280px] w-full rounded-xl' />
  </figure>
  <div className="card-body space-y-2">
    <h2 className="card-title text-2xl text-primary">
      {title}
    </h2>
    <p className='text-gray-600'>{shortDescription}</p>
    <div className=" flex my-2">
      <p className='font-bold'>
      Max Loan Limit:
      </p>
     <p className="badge badge-secondary font-semibold mr-10">
       {convert(maxLoanLimit)} TK
      </p> 
     </div>
    
    <div className="card-actions justify-center mt-10 mb-5">
      <Link to={`/loan-details/${loan._id}`} className='btn btn-secondary w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out  hover: shadow-lg hover:scale-[1.02] hover:bg-green-300'><span><TbListDetails /></span>View Details</Link>
    </div>
  </div>
</div>
      <link t />
        </div>
    );
};

export default LatestLoansCard;