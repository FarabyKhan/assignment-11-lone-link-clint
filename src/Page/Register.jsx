import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../useHooks/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const navigate = useNavigate()

  const { registerUser, updateUserProfile,setLoading } = useAuth()

  const handleRegister = (data) => {
    console.log('after register', data);
    const profileImg= data.photo[0];

      registerUser(data.email, data.password)
      .then(result=>{
        console.log(result.user);

        const formData = new FormData()
        formData.append('image',profileImg)
        const image_API_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`
        axios.post(image_API_URL, formData)
        .then(res=>{
          console.log('after image upload',res.data.data.url);
          
          const userProfile={
            displayName: data.name,
            photoURL: res.data.data.url
          }
            updateUserProfile(userProfile)
            .then(()=>{
              console.log('user profile update done');
              navigate("/")
              setLoading(false)
            })
            .catch(error=> console.log(error)
            )
            setLoading(false)
        })
      })
      .catch(error=>{
          console.log(error);
          
        })
  }
  return (
    <div className='flex justify-center min-h-screen my-5 items-center'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div className='text-center my-10'>
          <h1 className='text-2xl font-bold text-secondary'>Welcome To LoanLink</h1>
        <p className='text-2xl font-bold'>Please Register</p>
        </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              
              {/* Name field */}
              <label className="label">Name</label>
              <input type="name" {...register('name', { required: 'Name is required' })} className="input" placeholder="Name" />
              {
                errors.name?.type === 'required' && (<p className='text-red-500 text-sm'>{errors.email.message}</p>)
              }

              {/* Email field */}
              <label className="label">Email</label>
              <input type="email" {...register('email', { required: 'Email is required' })} className="input" placeholder="Email" />
              {
                errors.email?.type === 'required' && (<p className='text-red-500 text-sm'>{errors.email.message}</p>)
              }

              {/* Photo field */}
              <label className="label">Photo</label>
              <input type="file" {...register('photo', { required: 'Photo is required' })} className="file-input" placeholder="Your Photo" />
              {
                errors.photo?.type === 'required' && (<p className='text-red-500 text-sm'>{errors.photo.message}</p>)
              }

               {/* Role field */}
              <label className="label">Role</label>
              <select className='select select-bordered'{...register('role', { required: 'Role is required' })}>
              <option value="" disabled>Select Your Role</option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
              </select>
              {
                errors.role?.type === 'required' && (<p className='text-red-500 text-sm'>{errors.role.message}</p>)
              }
              {/* Password field */}
              <label className="label">Password</label>
              <input type="password" {...register('password', {
                required: "Password is required!",
                minLength: 6,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message: 'Password must contain at least one uppercase and one lowercase letter',
                }
              })} className="input" placeholder="Password" />
              {
                errors.password?.type === 'required' &&   <p className="text-red-600">{errors.password.message}</p>
              }
              {
                errors.password?.type === 'minLength' && <p className='text-red-600'>Password must me 6 character or longer</p>
              }
              {
                errors.password?.type === 'pattern' && <p className='text-red-600'>Password must me al least one uppercase one lowercase character</p>
              }

              <div><a className="link link-hover">Forgot password?</a></div>
              <button className="btn btn-neutral mt-4">Register</button>
               <p className='my-3 text-sm'>New to LoanLink Please <Link to={'/auth/login'} className='text-secondary underline'>Login</Link></p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;