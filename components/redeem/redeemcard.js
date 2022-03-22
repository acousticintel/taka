import { useState } from 'react';
import { useRouter } from 'next/router';
//custom pack
import { motion, AnimatePresence } from "framer-motion";
//custom
import { useData } from '../../context/dataContext';

const contVar = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function RedeemCard({ points }) {
  const router = useRouter();
  const { onSetRedeemFilter } = useData();
  const [hover, setHover] = useState(false);

  const handleRedeemClick = e => {
    e.preventDefault();
    onSetRedeemFilter(points);
    router.push('/offers')
  }


  return (
    <div
      className={`redeem-card ${hover && 'selected'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={handleRedeemClick}
    >
      <AnimatePresence>
        {hover && (
          <motion.div 
          variants={contVar} 
          exit="hide"
          initial="hide" 
          animate="show"
          className="grad" />
        )}
      </AnimatePresence>
      <div className="content">
        <span>{points}</span>
        <span>Redeem</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
    </div>
  )
}
