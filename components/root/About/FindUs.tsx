import { Stars } from "lucide-react";

export default function FindUs() {
  return (
    <section
      id="about"
      className="bg-primary/5 lg: relative w-full px-4 py-36 lg:px-28"
    >
      <div className="flex flex-1 items-center justify-between space-y-4">
        <div className="">
          <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
            <h3 className="font-medium">Location</h3>
            <Stars className="size-4" />
          </div>
          <h2 className="max-w-xl text-5xl font-medium">
            You Can Found Us Here!
          </h2>
        </div>
        <p className="text-muted-foreground max-w-lg text-end">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
      </div>
      <div className="relative flex h-80 w-full flex-1 items-center justify-center overflow-hidden rounded-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.47351487016!2d104.78739117449534!3d-2.9660298397682303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b77006ef8e1fd%3A0x3dffc0491764f9c5!2sPT.%20Taruna%20Anugerah%20Mandiri!5e0!3m2!1sid!2sid!4v1744704239240!5m2!1sid!2sid"
          className="h-full w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
