import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { LoginCard } from '@/app/features/auth/components/LoginCard';

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  } else {
    return <LoginCard />;
  }
};

export default SignInPage;
