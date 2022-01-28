import { getProviders, signIn as SignInProvider, useSession } from 'next-auth/react'
import Image from 'next/image';

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}

export default function signIn({ providers }) {
  return (
    <div className='signIn-page'>
      <div className='flex flex-col h-full justify-center items-center'>
        <div className='h-40 w-40 mt-10 rounded-lg overflow-hidden relative'>
          <Image src='/assets/logo.png' alt='Taka' layout='fill'/>
        </div>
        <span className='uppercase text-gray-800 mt-3 font-bold text-2xl'>Taka</span>
        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name} className='mt-6'>
            <button
              className='p-3 bg-blue-500 rounded-lg hover:bg-blue-300 hover:font-bold transition-all duration-500 ease-in-out'
              onClick={() => SignInProvider(provider.id,{callbackUrl: '/profile' })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
