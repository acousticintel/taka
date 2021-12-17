import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/modal';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function History() {
  const router = useRouter();
  const { data: session, loading } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs);
    })
  }, [db])

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
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}
