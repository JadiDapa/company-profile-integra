import AuthCarousel from "@/components/auth/AuthCarousel";
import SignInForm from "@/components/auth/sign-in/SignInForm";
import AuthHeader from "@/components/auth/AuthHeader";
import { getUser } from "@/app/actions/user.actions";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <section className="relative flex min-h-screen overflow-hidden lg:px-28 lg:py-12">
      <AuthCarousel />

      <main className="relative flex w-full flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 shadow-2xl lg:w-[45%] lg:px-24">
        <AuthHeader
          title="Selamat Datang! Ayo Masuk"
          subtitle="Sebelum melangkah lebih lanjut, silahkan masuk terlebih dahulu!"
        />
        <SignInForm />
      </main>
    </section>
  );
}
