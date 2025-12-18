'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { ConfirmEmailDocument } from 'game-advisor_network';

const statusContent = {
  title: {
    loading: 'Confirming Email...',
    success: 'Email Confirmed!',
    error: 'Confirmation Failed',
  },
  header: {
    loading: <Loader2 className="w-8 h-8 text-secondary animate-spin" />,
    success: <CheckCircle2 className="w-8 h-8 text-secondary" />,
    error: <XCircle className="w-8 h-8 text-error" />,
  },
};

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  const [confirmEmailMutation] = useMutation(ConfirmEmailDocument);

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing confirmation token');
        return;
      }

      try {
        setStatus('loading');
        const { data, error } = await confirmEmailMutation({
          variables: {
            input: {
              token,
            },
          },
        });

        const confirmMessage = data?.confirmEmail.message;

        if (confirmMessage) {
          setStatus('success');
          setMessage(confirmMessage);
        } else {
          setStatus('error');
          setMessage(
            error?.message ||
              'Failed to confirm email. The link may have expired.'
          );
        }
      } catch {
        setStatus('error');
      }
    };

    confirmEmail();
  }, [token, confirmEmailMutation]);

  return (
    <Card className="w-full max-w-md py-8 bg-primary border border-secondary/10 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
          {statusContent.header[status]}
        </div>
        <CardTitle className="text-2xl font-bold text-secondary">
          {statusContent.title[status]}
        </CardTitle>
        <CardDescription className="text-contrast/80 leading-relaxed">
          {message}
        </CardDescription>
      </CardHeader>

      {status !== 'loading' && (
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
                onClick={() => router.push('/sign-up')}
              >
                Back to Sign Up
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
