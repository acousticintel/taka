import { useRouter } from 'next/router';
//custom pack
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
//custom func
import { useData } from '../context/dataContext';
import { AuthGuard } from '../components/layout/authGuard';
//custom
import Modal from '../components/modal';
import RedeemSection from '../components/redeem';
import PointsSection from '../components/points';

const contVar = {
  hide: {
  },
  show: {
    transition: {
      delayChildren: .3,
      when: 'beforeChildren',
      staggerChildren: .5,
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
    scale: 1,
    transition: {
      duration: .5
    }
  }
}

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { onSetModal } = useData();

  const handleHistoryClick = e => {
    router.push('/history')
  }

  return (
    <AuthGuard>
      <motion.div
        className='profile-page'
        variants={contVar}
        initial='hide'
        animate='show'
      >
        <Modal session={session} />
        <motion.h5 variants={riseVar}>
          Hello {session?.user.name}
        </motion.h5>
        <motion.div className='buttons-sec' variants={riseVar}>
          <button className='mx-auto lg:mx-0 bg-white 
          text-gray-800 font-bold rounded-full my-6 py-4 hover:text-blue-500
          px-8 shadow-lg focus:outline-none border-2 border-blue-300
          focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out'
            onClick={() => onSetModal(true)}
          >
            Upload
          </button>
          <button className='mx-auto lg:mx-4 bg-white 
          text-gray-800 font-bold rounded-full my-6 py-4 hover:text-blue-500
          px-8 shadow-lg focus:outline-none border-2 border-blue-300
          focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out'
            onClick={handleHistoryClick}>
            History
          </button>
        </motion.div>
        <motion.section variants={riseVar}>
          <PointsSection />
        </motion.section>
        <motion.section variants={riseVar}>
          <RedeemSection />
        </motion.section>
      </motion.div>
    </AuthGuard>
  )
}
