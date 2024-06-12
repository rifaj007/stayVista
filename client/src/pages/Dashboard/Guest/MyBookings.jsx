import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import BookingDataRow from '../../../components/Dashboard/TableRows/BookingDataRow'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyBookings = () => {
   // fetch all bookings for this logged in user
   const axiosSecure = useAxiosSecure()
   const { user } = useAuth()

   // Fetch Booking data
   const { data: bookings = [], isLoading: loading, refetch } = useQuery({
      queryKey: ['my-bookings', user?.email],
      queryFn: async () => {
         const { data } = await axiosSecure(`/my-bookings/${user?.email}`)
         return data
      }
   })

   if (loading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Info
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Row Data */}
                  {
                     bookings.map(booking => <BookingDataRow key={booking._id} booking={booking} refetch={refetch} ></BookingDataRow>)
                  }
               </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyBookings