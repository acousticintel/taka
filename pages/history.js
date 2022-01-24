import { useState } from 'react';
import Image from 'next/image';
//custom
import QrModal from '../components/qrmodal';
import { useData } from '../context/dataContext';
import { AuthGuard } from '../components/layout/authGuard';

export default function History() {

  const { onSetModal, posts } = useData();

  const [qr, setQr] = useState(null);

  return (
    <AuthGuard>
      <div className='history-page'>
        <QrModal photo={qr} />
        <h5>Uploaded Photos</h5>
        <div className='section-divider' />
        <section>
          <div className='flex flex-col'>
            {
              posts?.map(post => {
                return (
                  <div className='post-card' key={post.id}>
                    <div className='image'>
                      <Image src={post.data().image} layout='fill' />
                    </div>
                    <div className='desc'>
                      <h6>Category:</h6>
                      <p>{post.data().category}</p>
                    </div>
                    <div className='points'>
                      <p>Earned Points</p>
                      <h3>{post.data().points}</h3>
                    </div>
                    <div className='image qr' onClick={() => { setQr(post.data().qr); onSetModal(true) }}>
                      <Image src={post.data().qr} layout='fill' alt='' />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    </AuthGuard>
  )
}
