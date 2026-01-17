interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="">
      <div className="">
        <div className="text-primary flex items-center justify-center gap-4 text-center text-4xl font-semibold tracking-wide">
          <p>{title}</p>
        </div>
      </div>

      <p className="mx-auto mt-2 max-w-sm text-center text-sm">{subtitle}</p>
    </div>
  );
}
