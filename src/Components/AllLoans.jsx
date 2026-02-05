import React, { useEffect, useState } from 'react';

const AllLoans = () => {

    const[loans, setLoans] = useState([])

    useEffect(()=>{
        fetch('VITE_server_url/loans')
    },[])

    return (
        <div className='flex flex-col justify-center items-center mt-15'>
            <p className='text-3xl font-bold text-secondary mb-10'>All The Loans We Offer </p>
         
        </div>
    );
};

export default AllLoans;