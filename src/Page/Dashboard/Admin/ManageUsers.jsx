import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../useHooks/useAxiosSecure';
import LoadingAm from '../../Utility/LoadingAm';
import toast from 'react-hot-toast';


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()
  const [selectedUser, setSelectedUser] = useState(null);
  const [showReasonBox, setShowReasonBox] = useState(false)
  const [reason, setReason] = useState('');
  const [modal, setModal] = useState(false)
  const [updatedRole, setUpdatedRole] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const queryClint = useQueryClient()



  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`)
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, suspendReason, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        suspendReason,
        status,
        role,
      })
      return res.data;
    },
    onSuccess: () => {
      queryClint.invalidateQueries(['users'])
      closeModal()
      toast.success('User updated successfully')

    },
  });
  const openModal = (user) => {
    setSelectedUser(user);
    setUpdatedRole(user.role || 'borrower');
    setUpdateStatus(user.status || 'Active');
    setShowReasonBox(false)
    setReason('');
    setModal(true)
  };

  const closeModal = () => {
    setModal(false);
    setSelectedUser(null);
    setUpdatedRole('');
    setUpdateStatus('');
    setReason('');
    setShowReasonBox(false);
  };

  const handleApprove = () => {
    setUpdateStatus('Active');
    setShowReasonBox(false);
    setReason('');
  };


  const handleSuspendClick = () => {
    if (!showReasonBox) {
      setShowReasonBox(true)
      setUpdateStatus('Suspended');
      return;
    }
    if (!reason.trim()) {
      toast.error('Suspend reason is required')
      return;
    };
  }

  const handleFinalUpdate = () => {
    if (selectedUser.role === 'admin') {
      toast.error("Admin role cannot be changed");
      return;
    }

    if (updatedRole === 'admin') {
      toast.error("You can't assign admin role");
      return;
    }


    if (updateStatus === 'Suspended' && !reason.trim()) {
      toast.error("Suspended reason is required");
      return;
    }
    updateMutation.mutate({
      id: selectedUser._id,
      status: updateStatus,
      suspendReason: updateStatus === 'Suspended' ? reason : '',
      role: updatedRole
    })
  }



  return (
    <div>
      <h1 className='text-4xl text-primary font-semibold text-center'>Manage Users</h1>
      <div className="overflow-x-auto my-15">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className='text-accent'>
              <th>
                #
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>
              <tr key={user._id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-medium">{user.displayName}</div>

                    </div>
                  </div>
                </td>
                <td>
                  {user.email}

                </td>

                <td className='font-semibold'>
                  <span>
                    {user.role || 'borrower'}
                  </span>
                </td>
                <td ><span className={`badge ${user.status === 'Suspended' ? 'badge-error' : 'badge-success'} font-semibold`}>{user.status || 'Active'}</span></td>
                <th>
                  <button onClick={() => { openModal(user) }} className="btn btn-primary btn-sm">Update</button>
                </th>

              </tr>)}


          </tbody>

        </table>
        {modal && selectedUser && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box space-y-4">
              <h3 className="font-bold text-primary text-center text-2xl">Update User: {selectedUser.displayName}</h3>
              <div className='flex justify-center items-center gap-5 '>
                <h2 className='text-xl font-semibold text-accent'>Update Users Role:</h2>
                <select value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                  className='my-5 btn btn-primary'>
                  <option value="borrower">Borrower</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {showReasonBox && (
                <textarea value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder='Enter suspends reason'
                  className='textarea textarea-bordered w-full' />
              )}

              <div className="modal-action flex justify-between mt-4">
                <div className='flex gap-2'>
                  <button onClick={handleFinalUpdate} className='btn btn-primary btn-sm'>Update</button>
                  <button onClick={closeModal}
                    className='btn btn-ghost btn-sm'>
                    Cancel
                  </button>
                </div>
                <div className='flex gap-2'>
                  <button onClick={handleApprove} className='btn btn-secondary btn-sm'>Approve</button>
                  <button onClick={handleSuspendClick} className='btn bg-red-600 text-white btn-sm'>{showReasonBox ? "Confirm Suspend" : "Suspend"}</button>
                </div>


              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  )
};




export default ManageUsers;