//custom
import { AuthGuard } from '../components/layout/authGuard';
import { useData } from '../context/dataContext';
import Promo from '../components/comps/promo';
import Modal from '../components/modal';

export default function Offers() {
  const { redeemFilter, filVouchers, filDiscounts } = useData();

  return (
    <AuthGuard>
      <div className='offers-page'>
        <Modal />
        <h5>Vouchers</h5>
        <div className='section-divider' />
        <section>
          <div className='promo-section'>
            {
              filVouchers?.length > 0 && filVouchers.map((v, i) => (
                <Promo p={v} key={i} />
              ))
            }
          </div>
          {
            redeemFilter && filVouchers?.length < 1 && (
              <div className='text-gray-400 text-center w-full font-light text-lg'>
                <p>No promotions currently under {redeemFilter} points.</p>
                <p>Please check at a later date.</p>
              </div>
            )
          }
          {
            !redeemFilter && filVouchers?.length < 1 && (
              <div className='text-gray-400 text-center w-full font-light text-lg'>
                <p>No promotions currently running.</p>
                <p>Please check at a later date.</p>
              </div>
            )
          }
        </section>
        <h5>Discounts</h5>
        <div className='section-divider' />
        <section>
          <div className='promo-section'>
            {
              filDiscounts?.length > 0 && filDiscounts.map((v, i) => (
                <Promo p={v} key={i} />
              ))
            }
          </div>
          {
            redeemFilter && filDiscounts?.length < 1 && (
              <div className='text-gray-400 text-center w-full font-light text-lg'>
                <p>No promotions currently under {redeemFilter} points.</p>
                <p>Please check at a later date.</p>
              </div>
            )
          }
          {
            !redeemFilter && filDiscounts?.length < 1 && (
              <div className='text-gray-400 text-center w-full font-light text-lg'>
                <p>No promotions currently running.</p>
                <p>Please check at a later date.</p>
              </div>
            )
          }
        </section>
      </div>
    </AuthGuard>
  )
}
