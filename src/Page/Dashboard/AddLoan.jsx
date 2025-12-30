import axios from 'axios';
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { FiDollarSign } from "react-icons/fi";
import useAxiosSecure from '../../useHooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AddLoan = () => {
    const { register,
        handleSubmit,
        watch,
        formState: { error } } = useForm()
        
        const watchLoanLimit = watch('maxLoanLimit');
        const watchInterestRate = watch('interestRate');
        
    const axiosSecure = useAxiosSecure()

        const docs =[
                    "National ID",
                  "Trade License",
                  "Bank Statement (6 months)",
                  "Income Certificate",
        ];

        const calculateEMI =(principal, annualRate, months)=>{
            const r = annualRate/12/100;
            return Math.round(
                (principal*r*Math.pow(1+r, months)) / (Math.pow(1+r, months) -1) 
            );
        };

    const handleAddLoan = data => {
        const loanLimit = Number(data.maxLoanLimit);
        const interestRate = Number(data.interestRate);
         const imageFile = data.images[0];
        
        const emiPlans = (data.emiDurations || []).map(months=>({
            months:Number(months),
            monthlyAmount: calculateEMI(
                loanLimit,
               interestRate,
                Number(months)
            )
        }));

        const formData = new FormData()
        formData.append('image',imageFile)
         const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY_2}`
         axios.post(image_API_URL, formData)
         .then(res=>{
            const imageUrl = res.data.data.url

            const loanData ={
            title: data.loanTitle,
            description: data.description,
            category: data.category,
            interestRate,
            maxLoanLimit:loanLimit,
            requiredDocuments:data.requiredDocuments || [], 
             emiPlans,
            image:imageUrl,
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
       .then(res=>{
         console.log('Loan added successfully:',loanData);
            if(res.data.insertedId){
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Loan Has Been Created!!",
                showConfirmButton: false,
                timer: 1500
                });

            }
       })  
         }})

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
                        <input type="text"{...register('loanTitle')} className="input w-full mb-3 text-sm " placeholder="Loan Title" />
                        </div>
                      
                        {/* Loan Category */}
                       <div>
                         <label className="label my-3 text-sm font-bold">Category</label>
                        <select {...register('category')} className="select w-full mb-3 text-sm " defaultValue="Pick a Category">
                            <option disabled={true}>Pick a Category</option>
                            <option value="personal-loan">Personal Loan</option>
                            <option value="small-business-loan">Small Business Loan</option>
                            <option value="education-loan">Education Loan</option>
                            <option value="agriculture-loan">Agriculture Loan</option>
                            <option value="home-improvement-loan">Home Improvement Loan</option>
                            <option value="medical-loan">Medical Loan</option>
                        </select>
                       </div>
                        {/*Interest Rate */}
                       <div>
                         <label className="label my-3 text-sm font-bold">Interest Rate (%)</label>
                        <input type="number"{...register('interestRate')} className="input w-full mb-3  text-sm " placeholder="Interest Rate" />
                       </div>
                        {/* Max Loan Limit */}
                        <div>
                            <label className="label my-3 text-sm font-bold">Max Loan Limit</label>
                        <input type="number"{...register('maxLoanLimit')} className="input w-full mb-3  text-sm " placeholder="Max Loan Limit" />
                        </div>
                       
                        <div>
                         {/* Description */}
                        <label className="label my-3 text-sm font-bold">Description</label>
                        <input type="text"{...register('description')} className="textarea w-full mb-3  text-sm " placeholder="Loan Description" />
                       </div>
                        
                        {/* Required Documents*/}
                      <div className='md:col-span-2'>
                          <label className="label my-3 text-sm font-bold">Required Documents</label>
                       <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {
                            docs.map((doc, i)=>
                            <label key={i}  className='flex items-center gap-2 text-sm'>
                                <input type="checkbox"
                                value={doc}
                                {...register("requiredDocuments")}
                                />{doc}
                            </label>
                            )}

                       </div>
                      </div>
                       <div className='md:col-span-2'>
                         {/* EMI Plans */}
                        <label className="label my-3 text-sm font-bold">Available EMI Plans</label>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        {
                            [6,12,24].map((months, i)=>{
                        const emiAmount = watchLoanLimit && watchInterestRate ?
                        calculateEMI(
                            Number(watchLoanLimit),
                            Number(watchInterestRate),
                            months
                        ) : null;

                            return(
                                <label key={i} className='flex items-center gap-2 border p-3 rounded'>
                                 <div>
                                    <input
                                  type="checkbox"
                                  value={months}
                                  {...register('emiDurations')}
                                    />
                                    <span className='font-medium px-2'>{months} Months -</span>
                                 </div>
                                 {
                                    emiAmount && (
                              <span className='text-sm font-semibold text-green-600 flex items-center'>
                                <FiDollarSign />{emiAmount}/month   
                              </span>
                                    )}
                                 </label>
                            )
                            })}      
                        </div>
                        <p className='text-xs text-gray-500 mt-2'>
                         EMI amounts will be calculated automatically based on loan limit & interest
                        </p>
                       </div>
                        <div>
                            {/* Images Upload */}
                        <label className="label my-3 text-sm font-bold">Images</label>
                        <input type="file"{...register('images')} className="file-input w-full mb-3" placeholder="Images Upload" />
                        </div>
                      </div>
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