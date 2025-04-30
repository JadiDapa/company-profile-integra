import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VerificationPage() {
  const email = "youremail@gmail.com";
  const workspace = "psychology.com";

  return (
    <section className="relative grid min-h-screen place-items-center">
      <Image
        className="-z-10 object-cover object-center opacity-40"
        src="/images/auth-bg.png"
        fill
        alt="Auth Background"
      />
      <Card className="z-10 mx-auto max-w-lg border-none bg-primary px-8 shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="relative mx-auto mb-4 flex size-32 items-center justify-center rounded-3xl bg-secondary shadow-md">
            <div className="relative z-10 size-24">
              <Image
                src="/images/email-envelope.svg"
                fill
                className="object object-center"
                alt="Mail Illustration"
              />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-semibold text-secondary">
            Email Is On Its Way!
          </h1>

          <p className="mb-1 text-secondary">
            We sent an email to <span className="font-medium">{email}</span>.
          </p>

          <p className="mb-4 text-sm text-secondary">
            If this email address has an account on the {workspace} Slack
            workspace, you&apos;ll find a magic link that will sign you into
            that workspace.
          </p>

          <p className="mb-4 text-lg text-secondary">
            The link expires in 24 hours!
          </p>

          <h2 className="mb-1 text-3xl font-semibold text-secondary">
            Check Your Email!
          </h2>

          <p className="text-sm text-secondary">
            Not Receiving Any Email?{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Resend
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
