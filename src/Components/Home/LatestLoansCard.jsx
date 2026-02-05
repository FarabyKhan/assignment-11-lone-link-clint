import React from 'react';

const LatestLoansCard = ({loan}) => {
    const {image, title, shortDescription,maxLoanLimit} = loan
    return (
        <div>
           <div className="card bg-base-100 w-96 shadow-sm border border-gray-300 hover:scale-105
         transition ease-in-out rounded-xl">
  <figure>
    <img
      src={image}
      alt={title}  className='h-[200px] w-full rounded-xl' />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
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
      <button className='btn btn-primary mr-4 cursor-pointer transition-all duration-300 ease-in-out  hover: shadow-lg hover:scale-[1.02] hover:bg-blue-500'>Apply For Loan</button>
    </div>
  </div>
</div>
      <link t />
        </div>
    );
};

export default LatestLoansCard;