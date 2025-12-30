import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
              <Link to={'/'} className='flex items-center gap-2 no-underline hover:bg-transparent group transition-transform duration-200 group-hover:scale-105'>
            <img src='/loanlink_logo.png' className='h-10 w-10' alt="" />
            <p className='text-4xl font-bold transition-colors duration-200 group-hover:text-accent-focus text-primary'>LoanLink</p>
        </Link>
        </div>
    );
};

export default Logo;