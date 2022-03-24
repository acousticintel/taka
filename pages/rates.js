import { AuthGuard } from '../components/elements/authGuard';
import RatesTable from '../components/tables/ratesTable';
import DataDesTable from '../components/tables/dataDesTable';

export default function Rates() {

  return (
    <AuthGuard>
      <div className='rates-page'>
        <h3>Assets Caterogies</h3>
        <div className='section-divider' />
        <section>
          <RatesTable />
        </section>
        <h3>Data Destruction</h3>
        <div className='section-divider' />
        <section>
          <DataDesTable />
        </section>
      </div>
    </AuthGuard>
  )
}
