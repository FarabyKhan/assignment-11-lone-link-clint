import React, { useState } from 'react'
import useAxiosSecure from '../../../useHooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const LoanApplications = () => {
  const [modal, setModal] = useState(false)
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [filteredStatus, setFilteredStatus] = useState("all")

    const axiosSecure = useAxiosSecure()
    const { data: loanApplication = [] } = useQuery({
        queryKey: ['loan-application'],
        queryFn: async () => {
          const res = await axiosSecure.get(`loanApplication`)
          return res.data;
        }
    
      })

      const filteredLoans =loanApplication.filter((loan)=>{
          if(filteredStatus === "all"){
            return true;
          }
          else{
            return loan.status === filteredStatus;
          }
  })

      const convertAmount = (number) => {

    if (number >= 1000000)
      return (number / 1000000) + 'M'

    else if (number >= 1000)
      return (number / 1000) + 'K'

    return number
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCategory =(category)=>{
    if(!category){
      return"";
    }  
     else{
       return category.split('-').map(word=>
       word.charAt(0).toUpperCase()+ word.slice(1)).join(' ');
     }
  }

  const capitalizeText = (text = "")=>{
    return text.split(' ').map(word=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(' ');
  };

  const formatMoney = (amount) =>{
    if(!amount) return 0;
    return Number(amount).toLocaleString('en-BD')
  };

  const openModal = (loan) => {
   setSelectedLoan(loan)
    setModal(true)
  };

  const closeModal = () => {
    setModal(false);
    setSelectedLoan(null)
  };

  

  return (
    <div>
      <h1 className='text-4xl font-bold  text-center custom-font text-primary my-10'>Loan Applications</h1>
      <div className="overflow-x-auto my-15">
        <div className='flex justify-between items-center'>
          <div>
        <h2 className='text-center text-lg font-semibold custom-font text-primary'>
          Showing {filteredLoans.length} Applications</h2>
          </div>
          <div className='my-15 mr-5'>
            <select value={filteredStatus} onClick={(e)=> setFilteredStatus(e.target.value)}
              className='select select-bordered font-semibold custom-font'>
              <option value="all">All The Application</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <table className="table ">
          {/* head */}
          <thead>
            <tr className='text-accent'>
              <th>
                Loan ID
              </th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Loan Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) =>
              <tr key={loan._id}>
                <td>
                  {loan._id}
                </td>
                <td>
                  <div className='flex flex-col'>
                    <div className="font-bold text-medium text-accent">{loan.firstName} <span >{loan.lastName}</span></div>
                    <div className='text-sm'>{loan.email}</div>
                  </div>
                </td>
                <td className='font-bold text-secondary'>
                  {convertAmount(loan.amount)}
                </td>

                <td className='font-bold text-red-500'>
                  <span>
                    {formatCategory(loan.category)}
                  </span>
                </td>
                <td ><span className={`badge  border-none flex py-4 ${loan.status === 'rejected' ? 'badge-error' :
                  loan.status === 'approved' ? 'badge-success' : 'bg-[#feb600]'} font-semibold`}>{loan.status}</span></td>
                <td className='flex gap-2'>
                  
                  <button onClick={()=>openModal(loan)} className="btn btn-primary btn-sm">View</button>
                </td>

              </tr>)}


          </tbody>

        </table>
        {modal && selectedLoan && (
             <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box space-y-4">
              <img src={selectedLoan.image} alt="" />
              <div className='flex justify-center items-center gap-1'>
                 
                <h3 className="font-bold text-center text-accent text-2xl mt-5 ">{selectedLoan.title}</h3>
                </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-8'>
                
             <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Category:</label>
              <h3 className="font-bold text-center text-sm">{formatCategory(selectedLoan.category)}</h3>
             </div>

             <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Interest Rate:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.interestRate} %</h3>
             </div>

             <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Loan Status:</label>
              <h3 className="font-bold text-center text-sm">{capitalizeText(selectedLoan.status)}</h3>
             </div>

             <div>

             </div>

             <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Borrowers Name:</label>
              <h3 className="font-bold text-center text-sm flex gap-1">{selectedLoan.firstName}
               <span>{selectedLoan.lastName}</span></h3>
             </div>

            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Email:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.email}</h3>
               </div>
            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Contact No:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.contactNumber}</h3>
               </div>

            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Address:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.address}</h3>
               </div>
            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">National ID Card/Passport Number:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.npNumber}</h3>
               </div>
               <div>

               </div>

            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Income Source/Occupation:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.incomeSource}</h3>
               </div>

               <div>

               </div>

            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Monthly Income:</label>
              <h3 className="font-bold text-center text-sm flex items-center gap-1"><FaBangladeshiTakaSign />
              {formatMoney(selectedLoan.monthlyIncome)}</h3>
               </div>

            <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Loan Amount:</label>
              <h3 className="font-bold text-center text-sm flex items-center gap-1"><FaBangladeshiTakaSign />
              {convertAmount(selectedLoan.amount)}</h3>
               </div>

                <div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Extra Notes:</label>
              <h3 className="font-bold text-center text-sm">{selectedLoan.exNotes}</h3>
               </div>

                

              <div>

              </div>

              {selectedLoan.status ==="approved" && selectedLoan.approvedAt && (<div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Application Fee Status:</label>
              <h3 className="font-bold text-center text-sm">{capitalizeText(selectedLoan.applicationFeeStatus)}</h3>
               </div>)}

             {selectedLoan.status ==="approved" && selectedLoan.approvedAt && (<div className='flex items-center gap-1'>
              <label className="label my-3 text-sm font-bold">Approved Date:</label>
              <h3 className="font-bold text-center text-sm">{formatDate(selectedLoan.approvedAt)}</h3>
               </div> )}

              </div>
              
              <div className="modal-action flex justify-end mt-4">
                <div className='flex'>
                  
                  <button onClick={closeModal}
                    className='btn btn-primary'>
                    Close
                  </button>
                </div>
                


              </div>
            </div>
          </dialog>
          )}

      </div>
    </div>
  )
}

export default LoanApplications
