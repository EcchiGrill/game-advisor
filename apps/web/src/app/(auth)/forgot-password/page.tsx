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
import { Mail } from 'lucide-react';
import { ConfirmationCard } from '@/components/common/ConfirmationCard';
import {
  ForgotPasswordData,
  forgotPasswordSchema,
} from './forgot-password.schema';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordDocument } from 'game-advisor_network';
import { useMutation } from '@apollo/client/react';
import { toast } from 'react-toastify';
import { ErrorLabel } from '@/components/ui/ErrorLabel';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const email = useWatch({ control, name: 'email' });

  const [forgotPassword] = useMutation(ForgotPasswordDocument);

  const onSubmit = async (data: ForgotPasswordData) => {
    const { email } = data;

    const { data: forgotPasswordData, error } = await forgotPassword({
      variables: { input: { email } },
    });

    if (forgotPasswordData?.forgotPassword) {
      setShowConfirmation(true);
    }

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  return showConfirmation ? (
    <ConfirmationCard
      email={email}
      description="Please check your inbox and click the reset link to create a new password. The link will expire in 1 hour."
      onResendEmail={handleSubmit(onSubmit)}
      loading={isSubmitting}
    />
  ) : (
    <Card className="w-full max-w-md py-12 bg-primary border border-secondary/10 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-secondary">
          Forgot Password?
        </CardTitle>
        <CardDescription className="text-contrast/80">
          Enter your email and we'll send you a reset link
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
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-primary transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
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
    </Card>
  );
}
