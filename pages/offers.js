import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from '../components/modal';

export default function Offers() {
  const router = useRouter();
  const { data: session, loading } = useSession();

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
