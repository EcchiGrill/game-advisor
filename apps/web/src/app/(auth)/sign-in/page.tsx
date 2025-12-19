'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { signInSchema, SignInData } from './sign-in.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ErrorLabel } from '@/components/ui/ErrorLabel';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInData) => {
    const { email, password } = data;

    const response = await signIn('credentials', {
      identifier: email,
      password,
      redirect: false,
    });

    if (response?.error) {
      toast.error(response.error);
    } else {
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-md py-12 bg-primary border border-secondary/10 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-secondary">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-contrast/80">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-secondary">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-secondary/5 border-secondary/20 text-secondary placeholder:text-contrast/40"
                required
              />
            </div>
            {errors.email?.message && (
              <ErrorLabel message={errors.email.message} />
            )}
          </div>

          <div className="space-y-2 pb-4">
            <Label htmlFor="password" className="text-secondary">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10 bg-secondary/5 border-secondary/20 text-secondary placeholder:text-contrast/40"
                required
              />
            </div>
            {errors.password?.message && (
              <ErrorLabel message={errors.password.message} />
            )}
            <div className="flex justify-end pt-1">
              <Link
                href="/forgot-password"
                className="text-secondary/70 hover:text-secondary/50 text-sm transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-primary transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center text-contrast/70">
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            className="text-secondary hover:text-secondary/80 font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
