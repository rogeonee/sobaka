import { signInWithGoogleAction, signInWithOtpAction } from '@/app/actions';
import { FormMessage, type Message } from '@/components/form-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex-1 flex flex-col items-center">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <div className="mt-6">
        <button
          type="button"
          onClick={signInWithGoogleAction}
          className="bg-white border border-gray-300 text-black font-medium py-2 px-4 rounded-lg w-full flex justify-center items-center gap-2 shadow-sm hover:bg-gray-100"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>

      <div className="flex items-center w-full my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <form className="flex flex-col gap-2 min-w-64">
        <Label htmlFor="email">Sign in with Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton
          pendingText="Sending OTP..."
          formAction={signInWithOtpAction}
        >
          Send Magic Link
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
