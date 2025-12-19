import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../useHooks/useAuth';
import SocialLogin from './Utility/SocialLogin';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';



const Login = () => {
   const { register, handleSubmit, formState:{ errors }, } = useForm()
   const [email, setEmail] = useState("")
   const navigate = useNavigate()
   const location =useLocation()

    const { signInUser, resetPassword,setLoading } = useAuth()

    const handleLogin=(data)=>{
      console.log(data);
      signInUser(data.email, data.password)
       .then(result=>{
        console.log(result.user);
         navigate(location?.state || '/')
         setLoading(false)
      })
      .catch(error=>{
          console.log(error);
          setLoading(false)
        })
    }

    const handleForgetPassword = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Enter your email address first!")
      return
    }
    resetPassword(email)
      .then(() => {
        setLoading(false)
        toast.success("Password reset email send ! Please check your email....")
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false)
      })
  }

    return (
        <div  className='flex justify-center min-h-screen my-5 items-center'>
             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <div className='text-center my-10'>
          <h1 className='text-2xl font-bold text-secondary'>Welcome Back To LoanLink</h1>
        <p className='text-2xl font-bold'>Please Login</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
            {/* Email field */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:'Email is required'})} className="input" placeholder="Email" />
          {
            errors.email?.type === 'required'  && ( <p className='text-red-500 text-sm'>{errors.email.message}</p> )
          }
            {/* Password field */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:"Password is required!",
             minLength:6,
              pattern:{value:/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
               message:'Password must contain at least one uppercase and one lowercase letter',},})} className="input" placeholder="Password" />
                {
                        errors.password?.type === 'required' && <p className='text-red-600'>{errors.password.message}</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-600'>Password must me 6 character or longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-600'>Password must me al least one uppercase one lowercase and lease one number and at least  one special character</p>
                    }

          <button onClick={handleForgetPassword} className="link link-hover" >Forgot password?</button>
          <button className="btn btn-neutral mt-4">Login</button>
         <SocialLogin></SocialLogin>
            <p className='my-3 text-sm'>New to LoanLink Please <Link to={'/auth/register'} className='text-secondary underline'>Register</Link></p>
        </fieldset>
        </form>
      </div>
    </div>
        </div>
    );
};

export default Login; 