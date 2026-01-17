"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeClosed, LoaderCircle, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { signInUser } from "@/app/actions/user.actions";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  username: z.string().min(1, "Email tidak boleh kosong"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export default function SignInForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    if (!isLoaded) return; // Clerk belum ready

    startTransition(async () => {
      try {
        const { redirectTo } = await signInUser({
          username: values.username,
          password: values.password,
        });

        const result = await signIn.create({
          identifier: values.username,
          password: values.password,
        });

        if (result.status === "complete" && result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          toast.success("Berhasil Masuk!");
          form.reset();
          router.push(redirectTo);
          return;
        }

        toast.error("Gagal login. Coba lagi.");
      } catch (e: any) {
        toast.error(e?.message ?? "Kesalahan Kombinasi SSID dan Password!");
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-4 w-full lg:mt-6"
    >
      <FieldGroup {...form}>
        <div className="space-y-4">
          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <Field className="relative">
                <InputGroup className="h-12">
                  <InputGroupInput
                    {...field}
                    className="ml-2"
                    aria-invalid={fieldState.invalid}
                    placeholder="SSID"
                    autoComplete="off"
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field className="relative">
                <InputGroup className="h-12">
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    className="ml-2"
                    type={isVisible ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <Eye /> : <EyeClosed />}
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Button
          disabled={isPending}
          className="flex h-10 w-full items-center gap-3 text-lg lg:h-12"
        >
          {isPending ? (
            <>
              Memuat
              <LoaderCircle className="h-6 w-6 animate-spin text-gray-500" />
            </>
          ) : (
            "Masuk"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
