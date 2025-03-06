import Link from 'next/link';
import { signInWithGoogleAction } from '@/app/actions';

export default function Signup() {
  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Use Google to sign up quickly.
        </p>
        <button
          type="button"
          onClick={signInWithGoogleAction}
          className="bg-white border border-gray-300 text-black font-medium py-2 px-4 rounded-lg w-full flex justify-center items-center gap-2 shadow-sm hover:bg-gray-100 mt-4"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
        <p className="text-sm text-foreground mt-4">
          No Google account?{' '}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Use email
          </Link>
        </p>
      </div>
    </div>
  );
}
