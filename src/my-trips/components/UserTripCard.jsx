import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
  const [photoUrl,setPhotoUrl] = useState();

  useEffect(()=>{
    trip&&GetPlaceImg();
  },[trip])

  const GetPlaceImg=async()=>{
    const data={
      textQuery:trip?.userSelection?.location
    }
    const result= await GetPlaceDetails(data).then(resp=>{
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'/view-trip/'+trip?.id}>
      <div className='group relative overflow-hidden rounded-2xl bg-white shadow-md 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
        {/* Image Container */}
        <div className='relative h-[250px] overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10' />
          <img 
            src={photoUrl} 
            className='h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300'
            alt={trip?.userSelection?.location}
          />
          
          {/* Budget Badge */}
          <div className='absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 
            rounded-full text-sm font-medium text-gray-700'>
            {trip?.userSelection?.budget}
          </div>
        </div>

        {/* Content */}
        <div className='p-5 space-y-2'>
          <h2 className='font-semibold text-xl text-gray-800'>
            {trip?.userSelection?.location}
          </h2>
          <div className='flex items-center gap-2 text-gray-600'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f56551]" 
              viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                clipRule="evenodd" />
            </svg>
            <span className='text-sm'>
              {trip?.userSelection?.totalDays} Days Trip
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCard
