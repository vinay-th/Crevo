import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignUpCard } from '@/app/features/auth/components/SignUpCard';

const SignUpPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  } else {
    return <SignUpCard />;
  }
};

export default SignUpPage;
