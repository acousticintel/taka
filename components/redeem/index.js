//custom packs
import { motion } from 'framer-motion';
//custom
import RedeemCard from './redeemcard';
import { points } from '../../context/points';

const contVar = {
  hide: {
  },
  show: {
    transition: {
      delayChildren: 1.5,
      staggerChildren: .3,
    }
  }
}

const riseVar = {
  hide: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  show: {
    opacity: 1,
    y: 0,
    scale:1,
    transition: {
      duration: .75
    }
  }
}

export default function RedeemSection() {
  return (
    <div>
      <h3>Redeem Points</h3>
      <div className='section-divider' />
      <motion.div
        className='redeem-section'
        variants={contVar}
        initial='hide'
        animate='show'
      >
        {
          points && points.map((p, i) => (
            <motion.div variants={riseVar} key={i} >
              <RedeemCard points={p}/>
            </motion.div>
          ))
        }
      </motion.div>
    </div>
  );
}
