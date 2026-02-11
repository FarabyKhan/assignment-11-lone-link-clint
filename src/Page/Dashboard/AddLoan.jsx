import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbCurrencyTaka } from "react-icons/tb";
import useAxiosSecure from '../../useHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../useHooks/useAuth';
import { Link } from 'react-router';


const AddLoan = () => {
    const { register,
        handleSubmit,
        watch,
        reset,
        formState: { errors } } = useForm()

        const{setLoading} = useAuth()
    const [showAllPlans, setShowAllPlans] = useState(false)
    const emiOptions = [6, 12, 24, 36, 48, 60, 90, 120, 180];

    const [showCustomDoc, setShowCustomDoc] = useState(false)
    const [customDocs, setCustomDocs] = useState([]);
    const [customDocText, setCustomDocText] = useState('');

    const watchLoanLimit = watch('maxLoanLimit');
    const watchInterestRate = watch('interestRate');

    const axiosSecure = useAxiosSecure()

    const docs = [
        "National ID",
        "Trade License",
        "Bank Statement (6 months)",
        "Income Certificate",
    ];

    const calculateEMI = (principal, annualRate, months) => {
        const r = annualRate / 12 / 100;
        return Math.round(
            (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
        );
    };

    const handleAddLoan = data => {
        const loanLimit = Number(data.maxLoanLimit);
        const interestRate = Number(data.interestRate);
        const imageFile = data.images[0];

        const emiPlans = (data.emiDurations || []).map(months => ({
            months: Number(months),
            monthlyAmount: calculateEMI(
                loanLimit,
                interestRate,
                Number(months)
            )
        }));

        const formData = new FormData()
        formData.append('image', imageFile)
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY_2}`
        axios.post(image_API_URL, formData)
            .then(res => {
                const imageUrl = res.data.data.url

                const loanData = {
                    title: data.loanTitle,
                    description: data.description,
                    shortDescription: data.shortDescription, 
                    category: data.category,
                    interestRate,
                    maxLoanLimit: loanLimit,
                    requiredDocuments: data.requiredDocuments || [],
                    emiPlans,
                    image: imageUrl,
                    showOnHome: false,
                    createdAt: new Date(),
                }
                console.log(loanData);
                Swal.fire({
                    title: "Are you sure to create the loan?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Confirm it!"
                }).then((result) => {

                    if (result.isConfirmed) {
                        axiosSecure.post('/loans', loanData)
                            .then(res => {
                                console.log('Loan added successfully:', loanData);
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "middle",
                                        icon: "success",
                                        title: "Loan Has Been Created!!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    reset();
                                    setCustomDocs([]);
                                    setCustomDocText('');
                                    setShowCustomDoc(false);
                                }
                            })
                    }
                })

            })

    }

    return (
        <div className='mt-10 text-black "w-full min-h-[calc(100vh-64px)]"'>
            <h1 className='text-2xl font-bold mb-6 text-center my-3'>Create A Loan</h1>
            <form onSubmit={handleSubmit(handleAddLoan)}>
                <div>
                    <fieldset className="fieldset shadow-2xl p-6 rounded-lg">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                            {/* Loan Title */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Loan Title</label>
                                <input type="text"{...register('loanTitle',{required:'Loan is required'})}  className="input w-full mb-3 text-sm " placeholder="Loan Title" />
                                {errors.loanTitle && (
                             <p className='text-red-500 text-xs'>{errors.loanTitle.message}</p>
                                )}
                            </div>
                            

                            {/* Loan Category */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Category</label>
                                <select {...register('category',{required:'Category is required'})} className="select w-full mb-3 text-sm " defaultValue="">
                                    <option value="" disabled className='text-gray-300'>Pick a Category</option>
                                    <option value="personal-loan">Personal Loan</option>
                                    <option value="small-business-loan">Small Business Loan</option>
                                    <option value="education-loan">Education Loan</option>
                                    <option value="agriculture-loan">Agriculture Loan</option>
                                    <option value="home-improvement-loan">Home Improvement Loan</option>
                                    <option value="medical-loan">Medical Loan</option>
                                </select>
                                {errors.category && (
                                    <p className='text-red-500 text-xs'>
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>
                            {/*Interest Rate */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Interest Rate (%)</label>
                                <input type="number" step="0.01" min="0" {...register('interestRate', { valueAsNumber: true , required:'Interest rate is required',min:{value:0.01, message:'Interest must be greater then 0'}})} className="input w-full mb-3  text-sm " placeholder="Interest Rate" />
                                {errors.interestRate && ( <p className='text-red-500 text-xs'>{errors.interestRate.message}</p> )}
                            </div>

                            

                            {/* Max Loan Limit */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Max Loan Limit</label>
                                <input type="number"{...register('maxLoanLimit', {required:'Loan limit is required', min:{value:1, message: 'Loan limit must be greater then 0'}})} className="input w-full mb-3  text-sm " placeholder="Max Loan Limit" />
                                {errors.maxLoanLimit && (
                                <p className='text-red-500 text-xs'>{errors.maxLoanLimit.message}</p>
                            )}
                            </div>
                            

                            {/* Short description */}
                            <div>
                            <label className="label my-3 text-sm font-bold">Short Description</label>
                            <input type="text"{...register('shortDescription',{required:'Short description must be required'})} className='input w-full mb-3 text-sm' placeholder='Short Description' />
                            {errors.shortDescription && (
                                 <p className='text-red-500 text-xs'>{errors.shortDescription.message}</p>
                            )}
                            </div>

                            

                            <div>
                                {/* Description */}
                                <label className="label my-3 text-sm font-bold">Long Description</label>
                                <input type="text"{...register('description',{required:'Description is required'})} className="textarea w-full mb-3  text-sm " placeholder="Loan Description" />
                                {errors.description && (
                            <p className='text-red-500 text-xs'>{errors.description.message}</p>
                            )}
                            </div>
                            

                            {/* Required Documents*/}
                            <div className='md:col-span-2'>
                                <label className="label my-3 text-sm font-bold">Required Documents</label>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                    {
                                        docs.map((doc, i) =>
                                            <label key={i} className='flex items-center gap-2 text-sm'>
                                                <input type="checkbox"
                                                    value={doc}
                                                    {...register("requiredDocuments",{validate:value=>value.length>0 || 'Select at least one document'})}
                                                />{doc}
                                            </label>
                                        )}
                                    {customDocs.map((doc, i) => (
                                        <label key={i} className='flex items-center gap-2 text-sm'>
                                            <input type="checkbox" value={doc} defaultChecked {...register("requiredDocuments")} />
                                            {doc}
                                        </label>
                                    ))}
                                    <div className='mt-3'>
                                        <button type='button' onClick={() => setShowCustomDoc(!showCustomDoc)}
                                            className='btn btn-outline btn-sm'>
                                            + Add Custom Document
                                        </button>
                                    </div>

                                    {showCustomDoc && (
                                        <div className='mt-3 flex gap-2'>
                                            <input type="text" value={customDocText}
                                                onChange={(e) => setCustomDocText(e.target.value)} className='input input-bordered w-full text-sm' />
                                            <button type="button" className='btn btn-primary ' value={customDocText}
                                                onClick={() => {
                                                    if (!customDocText.trim())
                                                        return;
                                                    setCustomDocs([...customDocs, customDocText.trim()]);
                                                    setCustomDocText('');
                                                    setShowCustomDoc(false);
                                                }} >
                                                Add
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                            {errors.requiredDocuments && (
                                <p className='text-red-500 text-xs mt-1'>
                                    At least one document is required.
                                </p>
                            )}
                            <div className='md:col-span-2'>
                                {/* EMI Plans */}
                                <label className="label my-3 text-sm font-bold">Available EMI Plans</label>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    {

                                        (showAllPlans ? emiOptions : emiOptions.slice(0, 3)).map((months, i) => {
                                            const emiAmount = watchLoanLimit && watchInterestRate ?
                                                calculateEMI(
                                                    Number(watchLoanLimit),
                                                    Number(watchInterestRate),
                                                    months
                                                ) : null;

                                            return (
                                                <label key={i} className='flex justify-between items-center gap-2 border border-green-200 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover: shadow-lg hover:scale-[1.02] hover:bg-green-400 hover:text-black bg-green-200'>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            value={months}
                                                            {...register('emiDurations',{validate:value=>value.length>0 || 'Select at least one EMI Plan'})}
                                                        />
                                                        <span className='font-medium px-2'>{months} Months -</span>
                                                    </div>
                                                    {
                                                        emiAmount && (
                                                            <span className='text-sm font-semibold text-green-900 flex items-center'>
                                                                <TbCurrencyTaka size={20} />{emiAmount}/month
                                                            </span>
                                                        )}
                                                </label>
                                            )
                                        })}

                                </div>
                                


                                <p className='text-xs text-gray-500 mt-2'>
                                    EMI amounts will be calculated automatically based on loan limit & interest
                                </p>
                                <div className='text-center mt-4'>
                                    <button type='button' onClick={() => setShowAllPlans(!showAllPlans)} className='btn btn-outline btn-sm'>
                                        {showAllPlans ? "Show More Plans" : "Show Less Plans"}
                                    </button>
                                </div>
                                 {errors.emiDurations && (
                                     <p className='text-red-500 text-xs mt-1'>
                                   Select at least one EMI Plan.
                                </p>
                                )}
                            </div>
                           

                            {/* Images Upload */}
                            <div>       
                                <label className="label my-3 text-sm font-bold">Images</label>
                                <input type="file"{...register('images',{required: 'Image is required'})} className="file-input w-full mb-3" placeholder="Images Upload" />
                            </div>
                        
                        </div>
                                {
                            errors.images &&(
                                <p className='text-red-500 text-xs mt-1'>{errors.images.message}</p>
                            )
                        }
                        <div className="mt-6 text-center">

                            <button className="btn btn-primary px-10 w-full">
                                Create Loan
                            </button>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    );
};

export default AddLoan;