'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion';
import { useMutation } from '@apollo/client/react';
import { ResendConfirmationDocument } from 'game-advisor_network';
import { useState, useEffect } from 'react';

interface ConfirmationCardProps {
  email: string;
}

export const ConfirmationCard = ({ email }: ConfirmationCardProps) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const [resendEmail, { loading }] = useMutation(ResendConfirmationDocument);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    await resendEmail({ variables: { input: { email } } });
    setCountdown(30);
  };

  return (
    <Card className="w-full max-w-md py-10 bg-primary border border-secondary/10 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-secondary" />
        </div>
        <CardTitle className="text-2xl font-bold text-secondary">
          Check Your Email
        </CardTitle>
        <CardDescription className="text-contrast/80 leading-relaxed">
          We've sent a confirmation link to{' '}
          <span className="text-secondary font-medium">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-4 rounded-md bg-secondary/5 border border-secondary/20">
          <p className="text-sm text-contrast/80 leading-relaxed">
            Please check your inbox and click the confirmation link to activate
            your account. The link will expire in 24 hours.
          </p>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="spam">
            <AccordionTrigger>
              <Badge
                variant="outline"
                className="w-full justify-center py-2 border-secondary/20 text-contrast/70"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Didn't receive the email? Check your spam folder
              </Badge>
            </AccordionTrigger>
            <AccordionContent>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleResendEmail}
                disabled={loading || countdown > 0}
              >
                {countdown > 0
                  ? `Resend Email (${countdown}s)`
                  : 'Resend Email'}
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full border-secondary/20 text-secondary hover:bg-secondary/5 bg-transparent"
          onClick={() => router.push('/sign-in')}
        >
          Back to Sign In
        </Button>
      </CardFooter>
    </Card>
  );
};
