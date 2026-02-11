import React from 'react';
import { useForm } from 'react-hook-form';
import { data } from 'react-router';

const LoanApply = () => {
    const { handleSubmit,
        register, 
        watch, 
        reset,  formState: { errors }}= useForm()

        const handleLoanApplication= data => {

        }

    return (
        <div className='mt-10 text-black "w-full min-h-[calc(100vh-64px)]"'>
            <h1 className='text-4xl font-bold mb-6 text-center my-3 text-primary'>Loan Application Form</h1>
            <form onSubmit={handleSubmit(handleLoanApplication)}>
                <div>
                    <fieldset className="fieldset shadow-2xl p-6 rounded-lg mx-30 px-5">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                            {/* First Name */}
                            <div>
                                <label className="label my-3 text-sm font-bold">First Name</label>
                                <input type="text"{...register('firstName',{required:'First Name  is required'})}  className="input w-full mb-3 text-sm " placeholder="First Name" />
                                {errors.loanTitle && (
                             <p className='text-red-500 text-xs'>{errors.firstName.message}</p>
                                )}
                            </div>
                            {/* Last Name */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Last Name</label>
                                <input type="text"{...register('lastName',{required:'Last Name  is required'})}  className="input w-full mb-3 text-sm " placeholder="Last Name" />
                                {errors.loanTitle && (
                             <p className='text-red-500 text-xs'>{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>
                    </fieldset>
                </div>

            </form>
        </div>
    );
};

export default LoanApply;