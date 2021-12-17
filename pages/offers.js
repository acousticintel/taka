import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/modal';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function Offers() {
  const router = useRouter();
  const { data: session, loading } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.push('/offers')
      } else {
        router.push('/auth/signin')
      }
    }
  }, [session])

  return (
    <div className="history-page">
      <Modal session={session} />
      <h5>Vouchers</h5>
      <div className="section-divider" />
      <section>
        <div className="flex flex-col">
          
        </div>
      </section>
      <h5>Discounts</h5>
      <div className="section-divider" />
      <section>
        <div className="flex flex-col">
          
        </div>
      </section>
    </div>
  )
}
