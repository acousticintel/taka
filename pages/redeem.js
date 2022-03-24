import { useRouter } from 'next/router';
import Image from 'next/image';
//custom
import { AuthGuard } from '../components/elements/authGuard';
import { useData } from '../context/dataContext';

export default function Redeem() {
  const router = useRouter();
  const { redeem } = useData();

  return (
    <AuthGuard>
      <div className='redeem-page'>
        <h5>Reedem</h5>
        <div className='section-divider' />
        <section>
          <div className='redeem-section'>
            <div className='image'>
              <Image src='/assets/samsung_promo.jpg' layout='fill' />
            </div>
            <h1>Redeem {redeem?.name} Voucher</h1>
            <p>{redeem?.ldesc}</p>
            <h6>Use this coupon code at the store.</h6>
          </div>
        </section>
      </div>
    </AuthGuard>
  )
}
