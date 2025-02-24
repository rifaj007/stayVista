import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import { useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import HostModal from '../../../Modal/HostRequestModal'
import useAuth from '../../../../hooks/useAuth'

const GuestMenu = () => {
   const [role] = useRole()
   const { user } = useAuth()
   const axiosSecure = useAxiosSecure()

   // for modal
   const [isModalOpen, setIsModalOpen] = useState(false)
   const closeModal = () => {
      setIsModalOpen(false)
   }

   // modal handler
   const modalHandler = async () => {
      console.log('I want to be Host');

      try {
         const currentUser = {
            email: user?.email,
            role: 'guest',
            status: 'Requested'
         }
         const { data } = await axiosSecure.put(`/user`, currentUser)
         console.log(data);
         if (data.modifiedCount > 0) {
            toast.success('Success! please, wait for Admin Confirmation')
         } else {
            toast.success('Please! wait for Admin approval')
         }
      } catch (err) {
         toast.error(err.message)
      } finally {
         closeModal()
      }
   }

   return (
      <>
         <MenuItem
            icon={BsFingerprint}
            label='My Bookings'
            address='my-bookings'
         />

         {role === 'guest' && (
            <div onClick={()=> setIsModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
               <GrUserAdmin className='w-5 h-5' />

               <span className='mx-4 font-medium'>Become A Host</span>
            </div>
         )}

         {/* Modal */}
         <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler}></HostModal>
      </>
   )
}

export default GuestMenu