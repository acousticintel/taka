import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/modal';

export default function Profile() {
  const router = useRouter();
  const { data: session, loading } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const handleClick = e => {
    e.preventDefault();
    if (session) {
      router.push('/history')
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
        <button className="py-1 px-5 mx-4 border-2 border-purple-300 rounded-full"
          onClick={() => setOpen(true)}
        >
          Upload
        </button>
        <button className="py-2 px-3 mx-4 border-2 
        border-purple-300 rounded-full"
          onClick={handleClick}>
          History
        </button>
      </div>
      <section>
        <h3>Submited Products</h3>
        <div className="section-divider" />
        <div className="flex justify-around ">
          <div className="flex" >
            <div className="relative h-10 w-10 mx-2 my-auto">
              <Image src="/assets/tcoin.png" layout='fill' />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">35</span>
              <span className="text-xs">Rewarded Points</span>
            </div>
          </div>
          <button className="py-1 px-5 border-2 border-red-300 
        rounded-full">
            Offers
          </button>
        </div>
      </section>
      <section>
        <h3>Redeem Points</h3>
        <div className="section-divider" />
        <div className="redeem-section ">
          <div className=" redeem-card selected">
            <span className="text-3xl font-bold">20</span>
            <span>Redeem</span>
          </div>
          <div className="redeem-card">
            <span className="text-3xl font-bold">40</span>
            <span>Redeem</span>
          </div>
          <div className="redeem-card">
            <span className="text-3xl font-bold">60</span>
            <span>Redeem</span>
          </div>
          <div className="redeem-card">
            <span className="text-3xl font-bold">80</span>
            <span>Redeem</span>
          </div>
          <div className="redeem-card">
            <span className="text-3xl font-bold">100</span>
            <span>Redeem</span>
          </div>
        </div>
      </section>
    </div>
  )
}
