import React from 'react';

const LatestLoansCard = ({loans}) => {
    const {image, title, shortDescription,maxLoanLimit} = loans
    return (
        <div>
           <div className="card bg-base-100 w-96 shadow-sm border border-gray-300 hover:scale-105
         transition ease-in-out rounded-xl">
  <figure>
    <img
      src={image}
      alt={title}  className='h-[200px] w-full rounded-xl' />
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
     <p className="badge badge-secondary mr-10">
       {maxLoanLimit} TK
      </p> 
     </div>
    
    <div className="card-actions justify-center mt-10 mb-5">
      <button className='btn btn-primary mr-4 cursor-pointer transition-all duration-300 ease-in-out  hover: shadow-lg hover:scale-[1.02] hover:bg-blue-500'>View Details</button>
    </div>
  </div>
</div>
      <link t />
        </div>
    );
};

export default LatestLoansCard;