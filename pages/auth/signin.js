import {
  getProviders,
  signIn as SignInProvider,
} from "next-auth/react";
import Image from "next/image";
import { AuthGuard } from "../../components/elements/authGuard";

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default function SignIn({ providers }) {
  return (
    <AuthGuard>
      <div className="signIn-page">
        <div className="flex flex-col h-full pt-10 items-center">
          <div className="h-60 w-40 rounded-lg overflow-hidden relative">
            <Image src="/assets/logo.png" alt="Taka" layout="fill" />
          </div>
          <span className="uppercase text-gray-800 mt-3 font-bold text-2xl">
            Taka
          </span>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name} className="mt-6">
                <button
                  onClick={() =>
                    SignInProvider(provider.id, { callbackUrl: "/profile" })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </AuthGuard>
  );
}
