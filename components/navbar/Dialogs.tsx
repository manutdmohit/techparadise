import { SignInDialog } from '@/components/sign-in-dialog';
import { SignUpDialog } from '@/components/sign-up-dialog';
import { ForgotPasswordDialog } from '@/components/forgot-password-dialog';

export default function Dialogs({
  signInOpen,
  signUpOpen,
  forgotOpen,
  setSignInOpen,
  setSignUpOpen,
  setForgotOpen,
}: any) {
  return (
    <>
      <SignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onSignUpClick={() => {
          setSignInOpen(false);
          setSignUpOpen(true);
        }}
        onForgotPasswordClick={() => {
          setSignInOpen(false);
          setForgotOpen(true);
        }}
      />
      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSignInClick={() => {
          setSignUpOpen(false);
          setSignInOpen(true);
        }}
      />
      <ForgotPasswordDialog
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        onSignInClick={() => {
          setForgotOpen(false);
          setSignInOpen(true);
        }}
      />
    </>
  );
}
