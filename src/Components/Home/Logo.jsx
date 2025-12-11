import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
              <Link to={'/'} className='flex items-end'>
            <img src='/loanlink_logo.png' className='h-[40px] w-[150px]' alt="" />
        </Link>
        </div>
    );
};

export default Logo;