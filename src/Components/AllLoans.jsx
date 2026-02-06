import React, { useEffect, useState } from 'react';
import { data } from 'react-router';
import AllLoansCard from './AllLoansCard';

const AllLoans = () => {

    const[loans, setLoans] = useState([])

    useEffect(()=>{
         fetch(`${import.meta.env.VITE_server_url}/loans`)
         .then(res=>res.json())
         .then(data=>setLoans(data))
         .catch(error=>console.error(error))
    },[])

    return (
        <div className='flex flex-col justify-center items-center mt-15'>
            <p className='text-3xl font-bold text-secondary mb-10'>All The Loans We Offer </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mr-2 w-11/12 gap-5 '>
                {
                loans.map(loan=><AllLoansCard key={loan._id} loan={loan}></AllLoansCard>)
            }
            </div>
         
        </div>
    );
};

export default AllLoans;