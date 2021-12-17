import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/modal';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import QrModal from '../components/qrmodal';

export default function History() {
  const router = useRouter();
  const { data: session, loading } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const [posts, setPosts] = useState([]);
  const [qr, setQr] = useState(null);

  useEffect(() => {
    if (session) {
      return onSnapshot(query(collection(db, session?.user.uid), orderBy('timestamp', 'desc')), snapshot => {
        setPosts(snapshot.docs);
      })
    }
  }, [db, session])

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.push('/history')
      } else {
        router.push('/auth/signin')
      }
    }
  }, [session])

  return (
    <div className="history-page">
      <QrModal photo={qr} />
      <h5>Uploaded Photos</h5>
      <div className="section-divider" />
      <section>
        <div className="flex flex-col">
          {
            posts?.map(post => {
              return (
                <div className="post-card" key={post.id}>
                  <div className="image">
                    <Image src={post.data().image} layout='fill' />
                  </div>
                  <div className="desc">
                    <h6>Category:</h6>
                    <h6>Description:</h6>
                    <p>{post.data().caption}</p>
                  </div>
                  <div className="points">
                    <p>Earned Points</p>
                    <h3>30</h3>
                  </div>
                  <div className="image qr" onClick={() => { setQr(post.data().qr); setOpen(true) }}>
                    <Image src={post.data().qr} layout='fill' />
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}
