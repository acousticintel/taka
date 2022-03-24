import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function AuthGuard({children}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading' && status === 'unauthenticated') {
      //auth is initialized and there is no user
      if (!session) {
        // redirect
        router.push('/auth/signin')
      }
    }
  }, [status, router, session])

  /* show loading indicator while the auth provider is still initializing */
  if (status === 'loading') {
    return <h1>Application Loading</h1>
  }

  // if auth initialized with a valid user show protected page
  if (status !== 'loading' && session) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}