import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contVar = {
  closed: {
    y: -10,
    scale: 0.95,
    opacity: 0,
  },
  open: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childVar = {
  closed: {
    scale: 0.95,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

export default function SelectDropdown({ value, list, change, setFunc }) {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <div>
          <button
            type="button"
            className="inline-flex 
            justify-center pt-3 w-full h-11 rounded-md border 
           border-gray-300 shadow-sm px-4 py-2 bg-gray-50 
            text-sm font-medium text-gray-700 
           hover:bg-white focus:outline-none 
            focus:ring-1 focus:ring-orange-900"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setDropOpen(!dropOpen)}
            onBlur={() => setDropOpen(false)}
          >
            {value}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {dropOpen && (
            <motion.div
              className="origin-top-center z-50 
          absolute inset-x-auto mt-2 w-full rounded-md 
          shadow-lg py-1 bg-white ring-1 ring-black 
          ring-opacity-5 focus:outline-none max-h-40 
          overflow-y-auto custom-scroll"
              initial="closed"
              animate="open"
              exit="closed"
              variants={contVar}
            >
              {
                // Active: "bg-gray-100", Not Active: ""
              }
              {list.map((l, i) => (
                <motion.li
                  variants={childVar}
                  key={i}
                  className="block px-4 py-2 text-sm text-gray-700 
                  hover:bg-gray-300 hover:text-gray-800"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  onMouseDown={() => change("select", { value: l }, setFunc)}
                >
                  {l}
                </motion.li>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
