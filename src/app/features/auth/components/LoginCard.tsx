'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Loader2, TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams';
import { useSearchParams } from 'next/navigation';

export function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const params = useSearchParams();
  const error = params.get('error');

  const onProviderSignIn = async (provider: 'github' | 'google') => {
    signIn(provider, {
      callbackUrl: '/',
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    signIn('credentials', {
      email: email,
      password: password,
      callbackUrl: '/',
    });
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="h-screen relative z-20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto animate-in">
          <CardHeader className="space-y-2">
            <CardTitle className="text-4xl text-center bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-4" />
              <p>Invalid email or password</p>
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onProviderSignIn('github')}
                  disabled={isLoading}
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  Sign in with GitHub
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onProviderSignIn('google')}
                  disabled={isLoading}
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Sign in with Google
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

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 font-normal"
                  onClick={() => {}}
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?
              <Link href="/signup">
                <Button variant="link" className="px-0">
                  Sign up
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default LoginCard;
