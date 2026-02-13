import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  useParams } from 'react-router';
import useAuth from '../useHooks/useAuth';
import Swal from 'sweetalert2';

const LoanApply = () => {

    const { _id } = useParams()
        const { user } = useAuth()
        const [loan, setLoan] = useState(null)

    const { handleSubmit,
        register, 
        watch, 
        reset,  formState: { errors }}= useForm()

        useEffect(()=>{
            if(!_id || !user)
                return;
            
             fetch(`http://localhost:3000/loans/${_id}`)
             .then(res=>res.json())
             .then(data=>{
                setLoan(data);
                reset({
                    email: user?.email || '',
                    loanTitle: data?.title || '',
                    interestRate: data.interestRate || ''
                })
             })

        },[_id,reset,user])

        const handleLoanApplication= async(formData) => {

 const fullPhoneNumber = `${formData.countryCode}${formData.contactNumber}`

            const applicationData = {
                ...formData,
                userEmail:user.email,
                contactNumber:fullPhoneNumber,
                loanId:_id,
                status: "pending",
                applicationFeeStatus:"unpaid",
                createdAt: new Date()    
            }

            delete applicationData.countryCode

            try {
           const confirmResult= await Swal.fire({
                                  title: "Are you sure to apply the loan?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, Confirm it!"
                              })
              
              if(!confirmResult.isConfirmed)
                return;
                const res = await fetch('http://localhost:3000/loan-application',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(applicationData)
              })
              
              
              const result = await res.json()
              if(result.insertedId){
                    Swal.fire({
                       position: "center",
                       icon: "success",
                       title: "Loan Application Submitted Successfully!",
                       showConfirmButton: false,
                       timer: 1500
                   });
                   reset()
              }

            } catch (error) {
                console.log(error);
                Swal.fire({
                       icon: "error",
                       title: "Something went wrong!",
                       showConfirmButton: false,
                       timer: 1500
                   });
            }
        }

    return (
        <div className='mt-10 text-black "w-full min-h-[calc(100vh-64px)]"'>
            <h1 className='text-4xl font-bold mb-6 text-center my-3 text-primary'>Loan Application Form</h1>
            <form onSubmit={handleSubmit(handleLoanApplication)}>
                <div>
                    <fieldset className="fieldset shadow-2xl p-6 rounded-lg mx-50 my-20 px-5">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto'>

                            {/* First Name */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">First Name</label>
                                <input type="text"{...register('firstName',{required:'First Name  is required'})}  className="input w-150 mb-3 text-sm " placeholder="First Name" />
                                {errors.firstName && (
                             <p className='text-red-500 text-xs'>{errors.firstName.message}</p>
                                )}
                            </div>
                            {/* Last Name */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Last Name</label>
                                <input type="text"{...register('lastName',{required:'Last Name  is required'})}  className="input w-150 mb-3 text-sm " placeholder="Last Name" />
                                {errors.lastName && (
                             <p className='text-red-500 text-xs'>{errors.lastName.message}</p>
                                )}
                            </div>

                           {/* Email */}
                           <div className='flex flex-col'>
                            <label className="label my-3 text-sm font-bold">Email</label>
                                <input type="text"{...register('email')} readOnly  className="input w-150 mb-3 text-sm " placeholder="Email" />
                                
                           </div>

                           {/* Address */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Address</label>
                                <input type="text"{...register('address',{required:'Address  is required'})}  className="input w-150 mb-3 text-sm " placeholder="Address" />
                                {errors.address && (
                             <p className='text-red-500 text-xs'>{errors.address.message}</p>
                                )}
                            </div>

                           {/* Contact Number */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Contact Number</label>
                                <div className='flex gap-2'>
                                    <select {...register('countryCode',{required:'Country code is required'})} className='select select-bordered w-32 text-sm'>
                                    <option value="">Code</option>
                                    <option n value="+088">BD +880</option>
                                    <option n value="+91">In +91</option>
                                    <option n value="+1">US +1</option>
                                    <option n value="+44">UK +44</option>
                                    <option n value="+61">AU +61</option>
                                    </select>
                                    <input type="number"{...register('contactNumber',{required:'Contact Number  is required', 
                                        minLength: {
                                            value:6,
                                            message: "Number is too short",
                                        },
                                    })}  
                                    className="input w-100 mb-3 text-sm " placeholder="Enter Phone Number" />
                                </div>
                                {errors.countryCode && (
                             <p className='text-red-500 text-xs'>{errors.countryCode.message}</p>
                                )}
                                {errors.contactNumber && (
                             <p className='text-red-500 text-xs'>{errors.contactNumber.message}</p>
                                )}
                            </div>

                           {/* National ID / Passport Number */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">National ID / Passport Number</label>
                                <input type="number"{...register('npNumber',{required:'National ID / Passport Number  is required'})}  className="input w-100 mb-3 text-sm " placeholder="National ID / Passport Number" />
                                {errors.npNumber && (
                             <p className='text-red-500 text-xs'>{errors.npNumber.message}</p>
                                )}
                            </div>

                           {/* Income Source */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Income Source</label>
                                <input type="text"{...register('incomeSource',{required:'Income Source  is required'})}  className="input w-150 mb-3 text-sm " placeholder="Income Source" />
                                {errors.incomeSource && (
                             <p className='text-red-500 text-xs'>{errors.incomeSource.message}</p>
                                )}
                            </div>
                            {/* Monthly Income */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Monthly Income</label>
                                <input type="number"{...register('monthlyIncome', {required:'Monthly Income is required', min:{value:1, message: 'Monthly Income must be greater then 0'}})} className="input w-150 mb-3  text-sm " placeholder="Monthly Income" />
                                {errors.monthlyIncome && (
                                <p className='text-red-500 text-xs'>{errors.monthlyIncome.message}</p>
                            )}
                            </div>
                             {/* Loan Title */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Loan Title</label>
                                <input type="text"{...register('loanTitle')} readOnly  className="input w-150 mb-3 text-sm " placeholder="Loan Title" />
                                
                            </div>

                            {/* Loan Amount */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Loan Amount</label>
                                <input type="number"{...register('loanAmount', {required:'Loan Amount is required', 
                                    min:{value:1, message: 'Loan Amount must be greater then 0'},
                                    max:{value: loan?.maxLoanLimit || 0,
                                        message:`Loan amount cannot exceed ${loan?.maxLoanLimit}`
                                     }
                                    })} className="input w-150 mb-3 text-sm " placeholder="Loan Amount" />
                                {errors.loanAmount && (
                                <p className='text-red-500 text-xs'>{errors.loanAmount.message}</p>
                            )}
                            </div>

                            {/*Interest Rate */}
                            <div className='flex flex-col'> 
                                <label className="label my-3 text-sm font-bold">Interest Rate (%)</label>
                                <input type="number" step="0.01" min="0" {...register('interestRate')} readOnly className="input w-80 mb-3  text-sm " placeholder="Interest Rate" />
                                {errors.interestRate && ( <p className='text-red-500 text-xs'>{errors.interestRate.message}</p> )}
                            </div>

                            {/* Reason for Loan */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Reason for Loan</label>
                                <input type="text"{...register('loanReason',{required:'Reason for Loan  is required'})}  className="input w-150 mb-3 text-sm " placeholder="Reason for Loan" />
                                {errors.loanReason && (
                             <p className='text-red-500 text-xs'>{errors.loanReason.message}</p>
                                )}
                            </div>

                            
                            
                            {/* Extra Notes */}
                            <div className='flex flex-col'>
                                <label className="label my-3 text-sm font-bold">Extra Notes</label>
                                <input type="text"{...register('exNotes')}  className="input w-150 mb-3 text-sm " placeholder="Extra Notes" />
                               
                            </div>

                        </div>
                        <button className='btn btn-primary mx-auto mt-10 my-5 w-280'>Apply For The Loan</button>
                    </fieldset>
                </div>

            </form>
        </div>
    );
};

export default LoanApply;