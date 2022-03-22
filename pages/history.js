import { motion } from "framer-motion";
//custom
import { useData } from '../context/dataContext';
import { AuthGuard } from '../components/elements/authGuard';

const childVar = {
  hide: {
    y: 5,
    scale: 0.95,
    opacity: 0,
  },
  show: i => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function History() {

  const { requests } = useData();

  const listOfOrders = (data) => {
    const unique = [...new Set(data.map(item => item.device))];
    if (unique) {
      let s = "";
      unique?.length > 0 && unique.map(item => s = `${s} ${item}`)
      return s;
    }
  }

  const totalOfOrders = (data) => {
    const t = 0;
    data.map(item => t = t + Number(item.count));
    return t;
  }

  return (
    <AuthGuard>
      <div className='history-page'>
        <h3>Request History</h3>
        <div className='section-divider' />
        <section className="hist__table">
          <table>
            <thead>
              <tr>
                <th scope="col">Items</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                requests?.length > 0 &&
                requests.map((r, i) => (
                  <motion.tr
                    variants={childVar}
                    initial="hide"
                    animate="show"
                    exit="hide"
                    custom={i}
                    key={i}
                    onClick={() => handleClick(r)}
                  >
                    <td>{listOfOrders(r.order)} x{totalOfOrders(r.order)}</td>
                    <td>{`Ksh ${r.total}`}</td>
                    <td className="scheduled">Scheduled</td>
                  </motion.tr>
                ))
              }
            </tbody>
          </table>
        </section>
      </div>
    </AuthGuard>
  )
}
