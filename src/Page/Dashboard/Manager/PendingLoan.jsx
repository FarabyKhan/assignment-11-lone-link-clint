import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosSecure from '../../../useHooks/useAxiosSecure'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import LoadingAm from '../../Utility/LoadingAm'



const PendingLoan = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [processingId, setProcessingId] = useState(null)
  

  const { data: loanApply = [], isLoading } = useQuery({
    queryKey: ['loan-application'],
    queryFn: async () => {
      const res = await axiosSecure.get(`loanApply`)
      return res.data;
    }

  })

  const handleStatus = async (id, status) => {
    if(processingId)
      return;
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status} this loan!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    });
    if (confirm.isConfirmed) {
      try {
        setProcessingId(id);

        await axiosSecure.patch(`/loanApply/status/${id}`, { status });
        await queryClient.invalidateQueries(['loan-application']);



        Swal.fire({
          position: "top",
          icon: "success",
          title: `Loan ${status} successfully`,
          showConfirmButton: false,
          timer: 1500
        });

      } catch (error) {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error, Something went wrong ${error}!`,
        });

      }
      finally {
        setProcessingId(null) 
      }
    }

  };


  const creationDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const convertAmount = (number) => {

    if (number >= 1000000)
      return (number / 1000000) + 'M'

    else if (number >= 1000)
      return (number / 1000) + 'K'

    return number
  }

  

  if ( isLoading) {
    return <LoadingAm></LoadingAm>
  }

  return (
    <div>
      <h1 className='text-4xl font-bold  text-center custom-font text-primary my-10'>Pending Loans</h1>
      <div className="overflow-x-auto my-15">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className='text-accent'>
              <th>
                Loan ID
              </th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanApply.map((loan) =>
              <tr key={loan._id}>
                <td>
                  {loan._id}
                </td>
                <td>
                  <div className='flex flex-col'>
                    <div className="font-bold text-medium text-accent">{loan.firstName} <span>{loan.lastName}</span></div>
                    <div className=''>{loan.email}</div>
                  </div>
                </td>
                <td className='font-bold text-secondary'>
                  {convertAmount(loan.loanAmount)}
                </td>

                <td className='font-semibold text-red-500'>
                  <span>
                    {creationDate(loan.createdAt)}
                  </span>
                </td>
                <td ><span className={`badge  border-none flex py-4 ${loan.status === 'rejected' ? 'badge-error' :
                  loan.status === 'approved' ? 'badge-success' : 'bg-[#feb600]'} font-semibold`}>{loan.status}</span></td>
                <td className='flex gap-2'>
                  <button disabled={processingId === loan._id} onClick={() => handleStatus(loan._id, 'approved')} className="btn bg-[#039487] text-white btn-sm">Approve</button>

                  <button disabled={processingId === loan._id} onClick={() => handleStatus(loan._id, 'rejected')} className="btn bg-[#d14249] text-white btn-sm">Reject</button>

                  <button onClick={() => navigate(`/loan-details/${loan._id}`)} className="btn btn-primary btn-sm">View</button>
                </td>

              </tr>)}


          </tbody>

        </table>
        
      </div>
    </div>
  )
}

export default PendingLoan
