import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//custom
import Modal from '../components/modal';
import { AuthGuard } from '../components/layout/authGuard';

export default function Offers() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);


  return (
    <AuthGuard>
      <div className="history-page">
        <Modal />
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
    </AuthGuard>
  )
}
