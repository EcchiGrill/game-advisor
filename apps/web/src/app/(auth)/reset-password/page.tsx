'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { ResetPasswordDocument } from 'game-advisor_network';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  ResetPasswordData,
} from './reset-password.schema';
import { ErrorLabel } from '@/components/ui/ErrorLabel';

const statusContent = {
  title: {
    loading: 'Validating Reset Link...',
    form: 'Reset Password',
    success: 'Password Reset Successful!',
    error: 'Invalid Reset Link',
  },
  header: {
    loading: <Loader2 className="w-8 h-8 text-secondary animate-spin" />,
    success: <CheckCircle2 className="w-8 h-8 text-secondary" />,
    error: <AlertCircle className="w-8 h-8 text-error" />,
    form: <Lock className="w-8 h-8 text-secondary" />,
  },
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<
    'loading' | 'form' | 'success' | 'error'
  >('loading');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('Enter your new password below');

  const [resetPasswordMutation, { error: resetPasswordError }] = useMutation(
    ResetPasswordDocument
  );

  useEffect(() => {
    const validateToken = () => {
      if (!token) {
        setStatus('error');
        setError('Missing reset token');
        return;
      } else {
        setStatus('form');
      }
    };

    validateToken();
  }, [token, resetPasswordMutation]);

  const onSubmit = async (data: ResetPasswordData) => {
    const { password } = data;

    const { data: resetPasswordData } = await resetPasswordMutation({
      variables: {
        input: {
          token: token!,
          newPassword: password,
        },
      },
    });

    const resetMessage = resetPasswordData?.resetPassword.message;

    if (resetMessage) {
      setStatus('success');
      setMessage(resetMessage);
    }
  };

  useEffect(() => {
    const handleResetPasswordError = () => {
      if (resetPasswordError) {
        setStatus('error');
        setMessage(
          resetPasswordError?.message ||
            'Failed to reset password. The link may have expired.'
        );
      }
    };

    handleResetPasswordError();
  }, [resetPasswordError]);

  return (
    <Card className="w-full max-w-md py-8 bg-primary border border-secondary/10 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-4 text-center">
        {
          <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
            {statusContent.header[status]}
          </div>
        }
        <CardTitle className="text-2xl font-bold text-secondary">
          {statusContent.title[status]}
        </CardTitle>
        <CardDescription className="text-contrast/80 leading-relaxed">
          {message}
        </CardDescription>
      </CardHeader>

      {status === 'form' && (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-error/10 border border-error/30 text-error text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-secondary">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  className="pl-10 bg-secondary/5 border-secondary/20 text-secondary placeholder:text-contrast/40"
                  required
                />
              </div>
              {errors.password?.message && (
                <ErrorLabel message={errors.password.message} />
              )}
            </div>

            <div className="space-y-2 pb-4">
              <Label htmlFor="confirmPassword" className="text-secondary">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast/50" />
                <Input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </CardContent>
      )}

      {status !== 'loading' && status !== 'form' && (
        <CardFooter className="flex flex-col gap-3">
          {status === 'success' && (
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 text-primary transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => router.push('/sign-in')}
            >
              Sign In to Your Account
            </Button>
          )}
          {status === 'error' && (
            <>
              <Button
                variant="outline"
                className="w-full border-secondary/20 text-secondary hover:bg-secondary/5 bg-transparent"
                onClick={() => router.push('/sign-in')}
              >
                Back to Sign In
              </Button>
              <div className="text-sm text-center text-contrast/70 pt-2">
                Need a new link?{' '}
                <Link
                  href="/forgot-password"
                  className="text-secondary hover:text-secondary/80 font-medium transition-colors"
                >
                  Request password reset
                </Link>
              </div>
            </>
          )}
        </CardFooter>
      )}

      {status === 'form' && (
        <CardFooter className="flex flex-col gap-4 pt-0">
          <div className="text-sm text-center text-contrast/70">
            Remember your password?{' '}
            <Link
              href="/sign-in"
              className="text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
