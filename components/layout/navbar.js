import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { withRouter } from 'next/router'

function Navbar({ router }) {
  const { data: session, status } = useSession();

  const [dropOpen, setDropOpen] = useState(false);
  const [clientWindowHeight, setClientWindowHeight] = useState('');

  const [backgroundTransparacy, setBackgroundTransparacy] = useState('bg-transparent');
  const [textColor, setTextColor] = useState('text-white');
  const [boxShadow, setBoxShadow] = useState('drop-shadow-none');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  const handleClick = e => {
    e.preventDefault();
    router.push('/profile');
  }

  useEffect(() => {
    if (router.pathname !== '/') {
      setBoxShadow('drop-shadow-lg');
      setTextColor('text-gray-800')
      setBackgroundTransparacy('bg-white');
    } else {
      if (clientWindowHeight > 10) {
        setBoxShadow('drop-shadow-lg');
        setTextColor('text-gray-800')
        setBackgroundTransparacy('bg-white');
      } else {
        setBoxShadow('drop-shadow-none');
        setTextColor('text-white')
        setBackgroundTransparacy('gradient');
      }
    };
  }, [clientWindowHeight, router]);

  return (
    <nav
      className={`fixed w-full z-30 top-0  
      transition-all duration-500 ease-in-out
      ${textColor} ${backgroundTransparacy} ${boxShadow}`}
    >
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          {
            //change location of logo if links exist
            //justify-center sm:justify-start
          }
          <div className='flex-1 flex items-center justify-start sm:items-stretch'>
            <Link href='/' passHref={true}>
              <div className='flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out'>
                TAKA
              </div>
            </Link>
            {
              //add to show other links
              //sm:block 
            }
          </div>

          <div className='absolute inset-y-0 right-0 flex items-center pr-2 
            sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            {
              status !== 'loading' && 
              status !== 'unauthenticated' && (
                <>
                  <button type='button' className='bg-gray-800 p-1 rounded-full 
            text-gray-400 hover:text-white focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                    {
                      //Heroicon name: outline/bell
                    }
                    <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                    </svg>
                  </button>

                  {
                    //Heroicon name: outline/bell
                  }
                  <div className='ml-3 relative'>
                    <div>
                      <button type='button'
                        className='bg-gray-800 flex text-sm rounded-full 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-offset-gray-800 focus:ring-white'
                        id='user-menu-button' aria-expanded='false'
                        aria-haspopup='true'
                        onClick={() => setDropOpen(!dropOpen)}
                        onBlur={() => setDropOpen(false)}
                      >
                        <span className='sr-only'>Open user menu</span>
                        <div className='relative h-8 w-8 rounded-full overflow-hidden'>
                          <Image src={session.user.image} layout='fill' alt='pp'/>
                        </div>
                      </button>
                    </div>
                    <Transition
                      show={dropOpen}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='user-menu-button' tabIndex='-1'>
                        {
                          // Active: 'bg-gray-100', Not Active: '' 
                        }
                        <a onMouseDown={handleClick} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-800' role='menuitem' tabIndex='-1' id='user-menu-item-0'>Your Profile</a>
                        <a onMouseDown={signOut} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-800' role='menuitem' tabIndex='-1' id='user-menu-item-2'>Sign out</a>
                      </div>
                    </Transition>
                  </div>
                </>
              )
            }
            {
              status !== 'loading' &&
              status === 'unauthenticated' && (
                <Link href='/auth/signin' passHref={true}>
                  <button
                    className='mx-auto lg:mx-0 bg-white 
                    text-gray-800 font-bold rounded-full my-6 
                    py-2 px-4 shadow-lg focus:outline-none 
                    focus:shadow-outline transform transition 
                    hover:scale-105 duration-300 ease-in-out'>
                    Login / SignUp
                  </button>
                </Link>
              )
            }

          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
