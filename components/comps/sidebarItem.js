import { useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from "framer-motion";
import { useData } from '../../context/dataContext';

const dropVar = {
  hide: {
    opacity: 0,
    height: 0,
    transition: {
      duration: .25,
    }
  },
  show: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: .25,
    }
  }
}

const list = ['Testing 1', 'Testing 2', 'Testing 3',]

export default function SidebarItem({ route }) {
  const router = useRouter();
  const { onSetSide } = useData();
  const [open, setOpen] = useState(false);

  const handleMainClick = (e) => {
    e.preventDefault();
    if (route?.list) {
      setOpen(!open);
    } else {
      onSetSide(false);
      router.push(route.route);
    };
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onSetSide(false);
    setOpen(!open);
    router.push(href);
  }

  return (
    <div
      className='text-left text-xl'>
      <div className=''>
        <div
          onClick={handleMainClick}
          className='py-4 px-16 flex justify-between mx-auto max-w-sm md:max-w-screen-md'>
          <span>{route?.name}</span>
          {route?.list?.length > 0 &&
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform duration-500 ${open && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>}
        </div>
        <AnimatePresence exitBeforeEnter>
          {
            open && (
              <motion.div
                exit='hide'
                animate='show'
                initial='hide'
                variants={dropVar}
                className='flex flex-col bg-white text-gray-900 items-center overflow-hidden'>
                {
                  route.list && route.list.map((l, i) => {
                    return (
                      <span
                        onClick={(e) => handleLinkClick(e, l.route)}
                        className='py-3'
                        key={i}>{l.name}</span>
                    );
                  })
                }
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
