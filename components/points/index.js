import { useRouter } from 'next/router';
import Image from 'next/image';
//custom packs
import { motion } from 'framer-motion';
import { useData } from '../../context/dataContext';

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

const coinVar = {
  hide: {
    opacity: 0,
    x: -40,
    rotate: -180
  },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: .25
    }
  }
}

const textVar = {
  hide: {
    opacity: 0,
    x: -15,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: .25,
      ease: 'easeIn'
    }
  }
}

const btnVar = {
  hide: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 2,
      duration: .3,
      ease: 'easeIn'
    }
  }
}

export default function PointsSection() {
  const router = useRouter();
  const { userPoints } = useData();

  const handleOffersClick = e => {
    e.preventDefault();
    router.push('/offers')
  }

  return (
    <div className='points-sec'>
      <h3>Submited Products</h3>
      <div className='section-divider' />
      <div className='flex flex-col sm:flex-row items-center justify-around px-10 gap-8'>
        <motion.div
          variants={contVar}
          initial='hide'
          animate='show'
          className='flex items-center' >
          <motion.div
            variants={coinVar}
            className='relative mx-3'>
            <div className='absolute h-14 w-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-yellow-300 rounded-full blur-sm'/>
            <div className='relative h-14 w-14 rounded-full overflow-hidden'>
              <Image src='/assets/points.svg' layout='fill' alt='' />
            </div>
          </motion.div>
          <div className='flex flex-col'>
            <motion.span
              variants={textVar}
              className='text-3xl font-normal'>{userPoints}</motion.span>
            <motion.span
              variants={textVar}
              className='text-xs font-semibold text-emerald-500'>Rewarded Points</motion.span>
          </div>
        </motion.div>
        <motion.button
          variants={btnVar}
          initial='hide'
          animate='show'
          className='button'
          onClick={handleOffersClick}>
          Offers
        </motion.button>
      </div>
    </div>
  );
}
