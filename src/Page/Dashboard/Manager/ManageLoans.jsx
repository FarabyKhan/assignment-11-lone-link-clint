import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosSecure from '../../../useHooks/useAxiosSecure'
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const ManageLoans = () => {

  const axiosSecure = useAxiosSecure()
  const [search, setSearch] = useState("")

  const queryClient = useQueryClient()

  const { data: loans = [] } = useQuery({
    queryKey: ['all-loans'],
    queryFn: async () => {
      const res = await axiosSecure.get('/manageLoans')
      return res.data;
    }
  })

  const searchLoan = loans.filter(loan =>
    loan.title?.toLowerCase().includes(search.toLowerCase()) ||
    loan.category?.toLowerCase().includes(search.toLowerCase())
  )

  const formatCategory = (category) => {
    if (!category) {
      return "";
    }
    else {
      return category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  }

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/loans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-loans'] })
    }
  })

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this loan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Loan has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }


    });
  }

  return (
    <div className=''>
      <h1 className='text-4xl text-primary font-semibold text-center '>Manage Loans</h1>
      <div className="overflow-x-auto my-10 bg-white p-10 shadow-2xl rounded-xl">
        <div className='flex justify-between items-center my-10 '>
          <div>
          
          </div>
          <div className='mx-10 '>

            <label className="input border-accent rounded-xl">
              <svg className="h-[1em] opacity-50 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
            </label>
          </div>
        </div>
        <table className="table ">
          {/* head */}
          <thead>
            <tr className='text-accent'>
              <th>SL.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Interest</th>
              <th>Category</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchLoan.map((loan, index) =>
              <tr key={loan._id} >
                <td>
                  {index + 1}
                </td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={loan.image}
                        alt={loan.title} />
                    </div>
                  </div>

                </td>
                <td>
                  <div>
                    <div className="font-bold text-medium">{loan.title}</div>
                  </div>
                </td>
                <td className='text-red-500 font-bold'>
                  {loan.interestRate} %
                </td>

                <td><span className='custom-font text-primary'>{formatCategory(loan.category)}</span></td>
                <td>
                  <div className='flex justify-center items-center gap-3'>
                    <Link to={`/dashboard/updates-loan/${loan._id}`} className="btn btn-primary btn-sm flex items-center"><MdOutlineUpdate className='w-4 h-4' />Update</Link>
                    <button onClick={() => handleDelete(loan._id)} className="btn btn-error text-white btn-sm flex items-center"><RiDeleteBin6Fill className='w-4 h-4' />Delete</button>

                  </div>

                </td>

              </tr>)}


          </tbody>

        </table>

      </div>
    </div>
  )
}

export default ManageLoans
