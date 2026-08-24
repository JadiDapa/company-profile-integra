import FadeIn from "@/components/root/FadeIn";
import { Stagger, StaggerItem } from "@/components/root/Stagger";

export default function Statistic() {
  return (
    <section
      id="statistic"
      className="relative flex w-full flex-col items-center justify-between gap-16 px-4 py-12 lg:px-24 lg:py-32"
    >
      <div className="flex w-full flex-col items-baseline justify-between space-y-4 lg:flex-row">
        <FadeIn
          as="h2"
          className="max-w-xl text-center text-4xl font-medium lg:text-start lg:text-5xl"
        >
          We Providing The Best For You
        </FadeIn>
        <FadeIn
          as="p"
          delay={0.1}
          direction="right"
          className="text-muted-foreground max-w-xl text-center text-sm lg:text-end lg:text-base"
        >
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure, built to grow with your needs.
        </FadeIn>
      </div>
      <Stagger className="flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-24">
        <StaggerItem>
          <StatisticCard
            value="100%"
            content="Satisfied Long Term Subscription Customer"
          />
        </StaggerItem>
        <DottedSeparator />
        <StaggerItem>
          <StatisticCard
            value="28"
            content="Provinces Covered by Our Service and Still Growing"
          />
        </StaggerItem>
        <DottedSeparator />
        <StaggerItem>
          <StatisticCard
            value="5000+"
            content="Customers Trusted Us to Provide Their Internet Connection"
          />
        </StaggerItem>
      </Stagger>
    </section>
  );
}

interface StatisticCardProps {
  value: string;
  content: string;
}

export function StatisticCard({ value, content }: StatisticCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-primary text-5xl font-semibold">{value}</p>
      <p className="text-muted-foreground max-w-72 lg:max-w-80">{content}</p>
    </div>
  );
}

export function DottedSeparator({ dots }: { dots?: number }) {
  return (
    <div className="hidden flex-col gap-2 lg:flex">
      {[...Array(dots || 6)].map((_, i) => (
        <div key={i} className="bg-primary/50 h-3 w-[3px] rounded-full" />
      ))}
    </div>
  );
}
