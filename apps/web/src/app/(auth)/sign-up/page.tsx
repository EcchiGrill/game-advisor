'use client';

import { useState } from 'react';
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
import { Mail, Lock, User } from 'lucide-react';
import { SignUpData, signUpSchema } from './sign-up.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { RegisterDocument } from 'game-advisor_network';
import { useMutation } from '@apollo/client/react';
import { toast } from 'react-toastify';
import { ErrorLabel } from '@/components/ui/ErrorLabel';
import { ConfirmationCard } from '@/components/common/ConfirmationCard';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const email = useWatch({ control, name: 'email' });

  const [registerMutation, { loading }] = useMutation(RegisterDocument);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = async (data: SignUpData) => {
    const { username, email, password } = data;

    const { data: registerData, error } = await registerMutation({
      variables: {
        input: {
          username,
          email,
          password,
        },
      },
    });

    if (registerData?.register) {
      setShowConfirmation(true);
    } else {
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return showConfirmation ? (
    <ConfirmationCard email={email} />
  ) : (
    <Card className="w-full max-w-md py-12 bg-primary border border-secondary/10 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-secondary">
          Create Account
        </CardTitle>
        <CardDescription className="text-contrast/80">
          Sign up to get started with your game journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-secondary">
              Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
              <Input
                {...register('username')}
                id="username"
                type="text"
                placeholder="Enter your name"
                className="pl-10 bg-secondary/5 border-secondary/20 text-secondary placeholder:text-contrast/40"
                required
              />
            </div>
            {errors.username?.message && (
              <ErrorLabel message={errors.username.message} />
            )}
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="password" className="text-secondary">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="Create a password"
                className="pl-10 bg-secondary/5 border-secondary/20 text-secondary placeholder:text-contrast/40"
                required
              />
            </div>
            {errors.password?.message && (
              <ErrorLabel message={errors.password.message} />
            )}
          </div>

          <div className="space-y-2 pb-5">
            <Label htmlFor="confirmPassword" className="text-secondary">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="pl-10 bg-secondary/5 border-secondary/20 text-secondary placeholder:text-contrast/40"
                required
              />
            </div>
            {errors.confirmPassword?.message && (
              <ErrorLabel message={errors.confirmPassword.message} />
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-primary transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center text-contrast/70">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-secondary hover:text-secondary/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
