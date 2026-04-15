
import useAxiosSecure from '../../../useHooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TiCancel } from "react-icons/ti";
import Swal from 'sweetalert2';

const ApprovedLoan = () => {
    
   
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()
    
    const { data: approvedLoan = [] } = useQuery({
        queryKey:['approved-loan'],
        queryFn: async()=>{
          const res = axiosSecure.get('approvedLoan')
          return (await res).data
        }
    });

    const handleCancelApprove = async(id)=>{
      const confirm = await Swal.fire({
  title: "Are you sure to cancel the approved loan application?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, cancel it!",
  cancelButtonText: "No",
});

  if(!confirm.isConfirmed)
    return
 try {
  await axiosSecure.patch(`/loanApply/status/${id}`,{
    status: "rejected",
  })
  
  queryClient.invalidateQueries(['approved-loan']);
    Swal.fire({
    title: "Success",
    text: "Approved loan application cancel successfully.",
    icon: "success"
  });
 } catch (error) {
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text:("Error","Something went wrong!",error)
});
 }
  }
   
    const convertAmount = (number) => {

    if (number >= 1000000)
      return (number / 1000000) + 'M'

    else if (number >= 1000)
      return (number / 1000) + 'K'

    return number
  }

  const approvedDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h1 className='text-4xl font-bold  text-center custom-font text-primary my-10'>Approved Loan Applications</h1>
      <div className="overflow-x-auto my-15">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className='text-accent'>
              <th>SL.No</th>
              <th>
                Loan ID
              </th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { approvedLoan.map((loan,index) =>
              <tr key={loan._id}>
                <th>
                  {index + 1}
                </th>
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
                    {approvedDate(loan.approvedAt)}
                  </span>
                </td>
                
                <td className='flex gap-2'>
                  
                  <button onClick={()=> handleCancelApprove(loan._id)}   className="btn bg-red-500 text-white btn-sm flex items-center"><TiCancel className='w-4 h-4' />Cancel Approve</button>
                </td>

              </tr>)}


          </tbody>

        </table>
        
      </div>
    </div>
  )
}

export default ApprovedLoan
