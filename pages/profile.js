import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from '../components/modal';
import RedeemCard from '../components/redeemcard';
import { useData } from '../context/dataContext';
import { points } from '../context/points';

export default function Profile() {
  const router = useRouter();
  const { data: session, loading } = useSession();
  const { onSetModal } = useData();

  const handleHistoryClick = e => {
    e.preventDefault();
    if (session) {
      router.push('/history')
    } else {
      router.push('/auth/signin')
    }
  }

  const handleOffersClick = e => {
    e.preventDefault();
    if (session) {
      router.push('/offers')
    } else {
      router.push('/auth/signin')
    }
  }

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.push('/profile')
      } else {
        router.push('/auth/signin')
      }
    }
  }, [session])

  return (
    <div className="profile-page">
      <Modal session={session} />
      <h5>Hello {session?.user.name}</h5>
      <div className="buttons-sec">
        <button className="mx-auto lg:mx-0 bg-white 
          text-gray-800 font-bold rounded-full my-6 py-4 hover:text-purple-500
          px-8 shadow-lg focus:outline-none border-2 border-purple-300
          focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out"
          onClick={() => onSetModal(true)}
        >
          Upload
        </button>
        <button className="mx-auto lg:mx-4 bg-white 
          text-gray-800 font-bold rounded-full my-6 py-4 hover:text-purple-500
          px-8 shadow-lg focus:outline-none border-2 border-purple-300
          focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out"
          onClick={handleHistoryClick}>
          History
        </button>
      </div>
      <section>
        <h3>Submited Products</h3>
        <div className="section-divider" />
        <div className="flex flex-col sm:flex-row items-center justify-around">
          <div className="flex items-center" >
            <div className="relative h-10 w-10 mx-2 my-auto">
              <Image src="/assets/tcoin.png" layout='fill' />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">35</span>
              <span className="text-xs">Rewarded Points</span>
            </div>
          </div>
          <button className="mx-auto lg:mx-4 bg-white 
          text-gray-800 font-bold rounded-full my-6 py-4 hover:text-red-400
          px-8 shadow-lg focus:outline-none border-2 border-red-300
          focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out"
          onClick={handleOffersClick}>
            Offers
          </button>
        </div>
      </section>
      <section>
        <h3>Redeem Points</h3>
        <div className="section-divider" />
        <div className="redeem-section ">
          {
            points && points.map((p, i)=>(
              <RedeemCard points={p} key={i}/>
            ))
          }
        </div>
      </section>
    </div>
  )
}
