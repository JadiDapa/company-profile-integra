import Image from "next/image";

export default function AuthCarousel() {
  return (
    <div className="hidden flex-1 lg:block">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-50"
      />
      <div className="relative flex h-80 w-120 items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          className="object-contain object-center"
          fill
        />
      </div>
    </div>
  );
}
