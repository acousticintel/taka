import Image from "next/image";
import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../../context/dataContext";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const modalVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 0.5,
    transition: {
      duration: 0.35,
    },
  },
};

const contentVar = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function RecentModal() {
  const box = useRef(null);
  useOutsideAlerter(box);
  const { recModal, selRequest } = useData();

  return (
    <AnimatePresence className="overflow-auto">
      {recModal && (
        <motion.div variants={contVar}
          initial="hide"
          animate="show"
          exit="hide"
          className="modal"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div variants={modalVar} className="modal__blind" />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div ref={box}
              variants={contentVar}
              className="relative inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-10 sm:px-20 py-10">
                <div className="my-5 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {
                  selRequest &&
                  selRequest.order?.length > 0 &&
                  selRequest.order.map((o, i) => (
                    <div key={i} className="flex justify-around items-center 
                    bg-white my-4 rounded-md overflow-hidden py-4 px-2">
                      <div className="relative">
                        <Image src="/assets/logoPhone.png"
                          alt="device"
                          width={40}
                          height={40}
                          objectFit="contain" />
                      </div>
                      <div>
                        <span className="font-semibold text-lg">{o.device}</span>
                        <div className="text-sm text-gray-500">
                          Recycled at <span className="text-emerald-900 font-semibold">35</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500">
                          Quantity
                        </span>
                        <span className="font-semibold text-lg">{o.count}</span>
                      </div>
                    </div>
                  ))
                }
                <div className="bg-white px-14 py-4 rounded-md">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-normal">Scheduled for:</span>
                    <span className="text-right font-semibold">Friday 25th, March</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Total:</span>
                    <span className="font-semibold text-2xl">{`Ksh ${selRequest?.total}`}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useOutsideAlerter(ref) {
  const { recModal, onSetRecModal } = useData();

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (recModal) onSetRecModal(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, recModal]);
}
