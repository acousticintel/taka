import { useState } from 'react';
import { Transition } from '@headlessui/react';

export default function SelectDropdown({ value, list, change }) {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <div>
          <button type="button" className="inline-flex 
            justify-center pt-3 w-full h-11 rounded-md border 
           border-gray-300 shadow-sm px-4 py-2 bg-white 
            text-sm font-medium text-gray-700 
           hover:bg-gray-50 focus:outline-none 
            focus:ring-1 focus:ring-offset-2 
           focus:ring-offset-gray-100 focus:ring-green-600"
            id="menu-button" aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setDropOpen(!dropOpen)}
            onBlur={() => setDropOpen(false)}
          >
            {value}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <Transition
          show={dropOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="origin-top-center z-50 
          absolute inset-x-auto mt-2 w-full rounded-md 
          shadow-lg py-1 bg-white ring-1 ring-black 
          ring-opacity-5 focus:outline-none max-h-40 
          overflow-y-auto custom-scroll" 
          role="menu" aria-orientation="vertical" 
          aria-labelledby="user-menu-button" 
          tabIndex="-1">
            {
              // Active: "bg-gray-100", Not Active: "" 
            }
            {
              list.map((l, i) => (
                <li key={i}
                  className="block px-4 py-2 text-sm text-gray-700 
                  hover:bg-gray-300 hover:text-gray-800"
                  role="menuitem" tabIndex="-1" id="user-menu-item-0"
                  onMouseDown={() => change({value:l})}
                >
                  {l}
                </li>
              ))
            }
          </div>
        </Transition>
      </div>
    </>
  )
}
