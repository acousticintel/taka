import { useRouter } from 'next/router';
import Image from 'next/image';
//custom
import { useData } from '../../context/dataContext';

export default function Promo({ p }) {
  const router = useRouter();
  const { onSetRedeem } = useData();

  const handleClick = () => {
    onSetRedeem(p)
    router.push('/redeem')
  }

  return (
    <div
      className='promo'
      onClick={handleClick}
    >
      <div className='content'>
        <h1>{p.name}</h1>
        <p>{p.sdesc}</p>
        <h2>{p.points} points</h2>
      </div>
      <div className='image'>
        <Image src='/assets/samsung_promo.jpg' layout='fill' />
      </div>
    </div>
  );
}
