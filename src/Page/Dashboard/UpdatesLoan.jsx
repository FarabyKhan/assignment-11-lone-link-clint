import { useForm } from "react-hook-form";
import useAuth from "../../useHooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router";
import { TbCurrencyTaka } from "react-icons/tb";
import LoadingAm from "../Utility/LoadingAm";



const UpdatesLoan = () => {

    const { register,
        handleSubmit,
        watch,
        reset,
        getValues,
        formState: { errors } } = useForm()

    const { loading,setLoading,user } = useAuth()
    const { id } = useParams()
    const [showAllPlans, setShowAllPlans] = useState(false)
    const emiOptions = [6, 12, 24, 36, 48, 60, 90, 120, 180];
    const [edit, setEdit] = useState(null);
    const [originalData, setOriginalData] = useState({});


    const watchLoanLimit = watch('maxLoanLimit');
    const watchInterestRate = watch('interestRate');

    const loanLimitValue = watchLoanLimit || originalData.maxLoanLimit;
    const interestRate = watchInterestRate || originalData.interestRate


    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    
    


    const calculateEMI = (principal, annualRate, months) => {
        const r = annualRate / 12 / 100;
        return Math.round(
            (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
        );
    };


    useEffect(() => {
        axiosSecure.get(`/loans/${id}`)
            .then(res => {
                console.log(res.data);

                const loan = res.data;

                const updatedData = {
                    loanTitle: loan.title,
                    description: loan.description,
                    shortDescription: loan.shortDescription,
                    category: loan.category,
                    interestRate: loan.interestRate,
                    maxLoanLimit: loan.maxLoanLimit,
                    emiDurations: loan.emiPlans?.map(plan => String(plan.months)),
                    image: loan.image,
                    showOnHome: loan.showOnHome
                };
                reset(updatedData)
                setOriginalData(updatedData)
            });
    }, [id, axiosSecure, reset])

    const handleAddLoan = async (data) => {
        try {
            const loanLimit = Number(data.maxLoanLimit);
        const interestRate = Number(data.interestRate);


        const emiPlans = (data.emiDurations || []).map(months => ({
            months: Number(months),
            monthlyAmount: calculateEMI(
                loanLimit,
                interestRate,
                Number(months)
            )
        }));

        let imageUrl = originalData.image;

        if (data.images && data.images.length > 0) {
            const formData = new FormData()
            formData.append('image', data.images[0])
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY_2}`
            const imgRes = await axios.post(image_API_URL, formData)

            imageUrl = imgRes.data.data.url

           
        } 
        
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
            showOnHome: originalData.showOnHome
        }
        
        console.log(loanData);
    const confirm =await Swal.fire({
            title: "Are you sure to update the loan?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm it!"
        }) 
         if (!confirm.isConfirmed) 
            return
         
                setLoading(true)
         const updateRes = await axiosSecure.patch(`/loans/${id}`, loanData)
                   
                        if (updateRes.data.modifiedCount > 0) {
                            const updatedLoan = await axiosSecure.get(`/loans/${id}`)
                            const loan = updatedLoan.data;
                            const updatedData ={
                                    loanTitle: loan.title,
                                    description: loan.description,
                                    shortDescription: loan.shortDescription,
                                    category: loan.category,
                                    interestRate: loan.interestRate,
                                    maxLoanLimit: loan.maxLoanLimit,
                                    emiDurations: loan.emiPlans?.map(plan => String(plan.months)),
                                    image: loan.image,
                                    showOnHome: loan.showOnHome
                                };
                                reset(updatedData);
                                setOriginalData(updatedData);

                            Swal.fire({
                                position: "middle",
                                icon: "success",
                                title: "Loan Has Been Updated!!",
                                showConfirmButton: false,
                                timer: 1500
                            });

                            
                            setTimeout(()=>{
                                if(user?.role === 'admin'){
                                    navigate('/dashboard/manage-loans')
                                }
                                else{
                                     navigate('/dashboard/all-loan');
                                }        
                            },1500);
                           

                        }
                            } catch (error) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!"(error),
                                
                                });
                            }finally{
                                setLoading(false)
                            }    

                        }

    

    const handleCancel = (data) => {
        reset({
            ...getValues(), [data]: originalData[data]
        });
        setEdit(null)
    }

    return (
        <div className='mt-10 text-black "w-full min-h-[calc(100vh-64px)]"'>
            <h1 className='text-4xl font-bold mb-6 text-center my-3 custom-font text-primary'>Update The Loan</h1>
            <form onSubmit={handleSubmit(handleAddLoan)}>
                <div>
                    <fieldset className="fieldset shadow-2xl p-6 rounded-lg">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                            {/* Loan Title */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Loan Title</label>
                                <input type="text"{...register('loanTitle')} readOnly={edit !== 'loanTitle'} className="input w-full mb-3 text-sm  font-semibold " placeholder="Loan Title" />
                                {edit === 'loanTitle' ? (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('loanTitle')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('loanTitle')}>
                                        Edit
                                    </button>)}

                            </div>


                            {/* Loan Category */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Category</label>
                                <select {...register('category')} readOnly={edit !== 'category'} className="select w-full mb-3 text-sm " defaultValue="">
                                    <option value="" disabled className='text-gray-300'>Pick a Category</option>
                                    <option value="personal-loan">Personal Loan</option>
                                    <option value="small-business-loan">Small Business Loan</option>
                                    <option value="education-loan">Education Loan</option>
                                    <option value="agriculture-loan">Agriculture Loan</option>
                                    <option value="home-improvement-loan">Home Improvement Loan</option>
                                    <option value="medical-loan">Medical Loan</option>
                                </select>
                                {edit === 'category' ? (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('category')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('category')}>
                                        Edit
                                    </button>)}
                            </div>

                            {/*Interest Rate */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Interest Rate (%)</label>
                                <input type="number" step="0.01" min="0" {...register('interestRate', { valueAsNumber: true, min: { value: 0.01, message: 'Interest must be greater then 0' } })} readOnly={edit !== 'interestRate'} className="input w-full mb-3  text-sm " placeholder="Interest Rate" />
                                {errors.interestRate && (<p className='text-red-500 text-xs'>{errors.interestRate.message}</p>)}
                                {edit === 'interestRate' ?
                                    (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('interestRate')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('interestRate')}>
                                        Edit
                                    </button>)}
                            </div>




                            {/* Max Loan Limit */}
                            
                                    <div>
                                <label className="label my-3 text-sm font-bold">Max Loan Limit</label>
                                <input type="number"{...register('maxLoanLimit', { min: { value: 1, message: 'Loan limit must be greater then 0' } })} readOnly={edit !== 'maxLoanLimit'} className="input w-full mb-3  text-sm " placeholder="Max Loan Limit" />
                                {edit === 'maxLoanLimit' ? (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('maxLoanLimit')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('maxLoanLimit')}>
                                        Edit
                                    </button>)}
                            </div>
                              


                            {/* Short description */}
                            <div>
                                <label className="label my-3 text-sm font-bold">Short Description</label>
                                <input type="text"{...register('shortDescription')} readOnly={edit !== 'shortDescription'} className='input w-full mb-3 text-sm' placeholder='Short Description' />

                                {edit === 'shortDescription' ? (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('shortDescription')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('shortDescription')}>
                                        Edit
                                    </button>)}
                            </div>




                            <div>
                                {/* Description */}
                                <label className="label my-3 text-sm font-bold">Long Description</label>
                                <input type="text"{...register('description')} readOnly={edit !== 'description'} className="textarea w-full mb-3  text-sm " placeholder="Loan Description" />

                                {edit === 'description' ? (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('description')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('description')}>
                                        Edit
                                    </button>)}
                            </div>




                            {/* EMI Plans */}
                            
                                        <div className='md:col-span-2'>
                                <label className="label my-3 text-sm font-bold">Available EMI Plans</label>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    {

                                        (showAllPlans ? emiOptions : emiOptions.slice(0, 3)).map((months, i) => {
                                            const emiAmount = loanLimitValue && interestRate ?
                                                calculateEMI(
                                                    Number(loanLimitValue),
                                                    Number(interestRate),
                                                    months
                                                ) : null;

                                            return (
                                                <label key={i} className='flex justify-between items-center gap-2 border border-green-200 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover: shadow-lg hover:scale-[1.02] hover:bg-green-400 hover:text-black bg-green-200'>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            value={months}
                                                            {...register('emiDurations', { validate: value => value.length > 0 || 'Select at least one EMI Plan' })}
                                                            readOnly={edit !== 'emiDurations'}

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
                                        {showAllPlans ? "Show Less Plans" : "Show More Plans"}
                                    </button>
                                </div>
                                {edit === 'emiDurations' ? (<button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel('emiDurations')}>Cancel</button>)
                                    : (<button type="button" className="btn btn-primary btn-sm" onClick={() => setEdit('emiDurations')}>
                                        Edit
                                    </button>)}
                            </div>
                                

                            {/* Images Upload */}
                            <div >
                                <label className="label my-3 text-sm font-bold">Images</label>
                                <img src={watch('image')} className="w-140 h-80 my-10 rounded" />
                                <input type="file"{...register('images')} className="file-input w-full mb-3" placeholder="Images Upload" />
                            </div>

                        </div>

                        <div className="mt-6 text-center">

                            <div className="flex justify-end items-center gap-3">
                                <button type="submit" className="btn btn-primary px-10" disabled={loading}>
                                   {loading ? LoadingAm : "Update"}
                                </button>
                                <Link to={user?.role === 'admin' ? '/dashboard/all-loan' : '/dashboard/manage-loans'} className="btn btn-ghost px-10">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    );
}

export default UpdatesLoan
