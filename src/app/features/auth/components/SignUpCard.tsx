'use client';
import { useState } from 'react';
import { Loader2, TriangleAlert } from 'lucide-react';
import Link from 'next/link';

import { useSignUp } from '@/app/features/auth/hooks/useSignUp';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';
import { useSearchParams } from 'next/navigation';

export function SignUpCard() {
  const mutation = useSignUp();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);

  const params = useSearchParams();
  const error = params.get('error');

  const onProviderSignUp = async (provider: 'github' | 'google') => {
    signIn(provider, {
      callbackUrl: '/',
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    mutation.mutate(
      {
        name: name,
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          signIn('credentials', {
            email: email,
            password: password,
            callbackUrl: '/',
          });
        },
      }
    );
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="h-screen relative z-20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto animate-in">
          <CardHeader className="space-y-2">
            <CardTitle className="text-4xl text-center ">
              Welcome to{' '}
              <span className="bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                Crevo
              </span>
            </CardTitle>
            <CardDescription className="text-center">
              Sign up to continue
            </CardDescription>
          </CardHeader>
          {!!mutation.error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-4" />
              <p>Invalid email or password</p>
            </div>
          )}
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onProviderSignUp('github')}
                disabled={isLoading}
              >
                <FaGithub className="mr-2 h-4 w-4" />
                Sign up with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onProviderSignUp('google')}
                disabled={isLoading}
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={isLoading}
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  disabled={isLoading}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  onFocus={() => setIsConfirmPasswordTouched(true)}
                  className={twMerge(
                    isConfirmPasswordTouched &&
                      confirmPassword !== password &&
                      'border-red-500'
                  )}
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?
              <Link href="/login">
                <Button variant="link" className="px-0">
                  Log in
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default SignUpCard;
