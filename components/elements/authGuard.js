import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AuthGuard({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    //console.log();
    if (status !== "loading") {
      //auth is initialized and there is no user
      if (!session || status === "unauthenticated") {
        // redirect
        router.push("/auth/signin");
      } else if (session) {
        if (router.pathname.indexOf("/auth/") == 0)
          // redirect
          router.push("/");
      }
    }
  }, [status, router, session]);

  /* show loading indicator while the auth provider is still initializing */
  if (status === "loading") {
    return <h1>Application Loading</h1>;
  }

  // if auth initialized with a valid user show protected page
  if (status !== "loading" && session) {
    return <>{children}</>;
  }

  // if auth initialized with a valid user show protected page
  //router.pathname.indexOf("/auth/") == 0 find if pathmane contains tag
  if (status !== "loading" && !session && router.pathname.indexOf("/auth/") == 0) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
