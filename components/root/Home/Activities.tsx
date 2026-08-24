import { getAllActivities } from "@/app/actions/activity.action";
import { formatDate } from "@/lib/utils/format-date";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/root/FadeIn";
import GrowIn from "@/components/root/GrowIn";
import { Stagger, StaggerItem } from "@/components/root/Stagger";

export default async function Activities() {
  const activities = await getAllActivities();

  return (
    <section
      id="reports"
      className="relative flex w-full flex-col items-center justify-between px-4 py-24 lg:px-28"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <FadeIn className="flex items-center gap-2">
          <ChevronsRight className="text-primary size-4" />
          <p className="text-secondary font-semibold tracking-[2px] uppercase">
            ACTIVITY REPORT
          </p>
          <ChevronsLeft className="text-primary size-4" />
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.1}
          className="text-3xl font-medium lg:text-5xl"
        >
          Our Team
          <span className="text-primary"> Activities</span>
        </FadeIn>
        <FadeIn
          as="p"
          delay={0.2}
          className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base"
        >
          Stay updated with the latest activities and events organized by our
          dedicated team. From community outreach programs to exciting
          workshops, explore how we are making a difference together.
        </FadeIn>
      </div>
      {activities.length > 0 && (
        <div className="w-full space-y-12">
          {/* Main Article */}
          <div className="relative hidden w-full gap-9 overflow-hidden max-lg:hover:cursor-pointer lg:col-span-2 lg:flex lg:flex-row">
            <GrowIn className="relative h-96 flex-1 cursor-pointer overflow-hidden md:h-80">
              <Image
                unoptimized
                src={getMediaUrl(activities[0].image?.url as string)}
                alt={activities[0].title}
                fill
                className="object-cover object-center"
                priority
              />
            </GrowIn>
            <FadeIn
              direction="right"
              delay={0.15}
              className="flex-1 space-y-6 p-2 lg:relative lg:block lg:p-0"
            >
              <h3 className="lg:text-foreground line-clamp-2 cursor-pointer text-lg font-medium text-white transition hover:underline lg:text-5xl lg:font-semibold">
                {activities[0].title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 text-sm lg:text-base">
                {activities[0].content}
              </p>
              <div className="flex cursor-pointer items-center gap-2 lg:mb-4">
                <Link
                  href="/activities"
                  className="text-primary text-xs capitalize hover:underline lg:text-sm"
                >
                  {activities[0].category}
                </Link>
                <span className="text-secondary text-xs lg:text-sm">
                  {formatDate(activities[0].createdAt.toString())}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right Side Articles */}
          <Stagger className="grid grid-cols-1 gap-9 space-y-6 lg:grid-cols-3">
            {/* Article 1 */}
            {activities.map((activity) => (
              <StaggerItem
                key={activity.id}
                className="relative w-full cursor-pointer space-y-2"
              >
                <div className="relative z-0 h-44 w-full shrink-0 overflow-hidden lg:h-52">
                  <Image
                    unoptimized
                    src={getMediaUrl(activity.image?.url as string)}
                    alt={activity.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-1 p-0 lg:relative lg:block">
                  <div className="order-2 flex items-center gap-2 lg:order-1">
                    <Link
                      href="/activities"
                      className="text-primary text-sm capitalize hover:underline"
                    >
                      {activity.category}
                    </Link>
                    <span className="text-secondary text-sm">
                      {formatDate(activity.createdAt.toString())}
                    </span>
                  </div>
                  <h2 className="lg:text-foreground text-foreground order-1 mb-2 line-clamp-2 text-lg font-medium transition hover:underline lg:order-2 lg:text-xl lg:font-semibold">
                    {activity.title}
                  </h2>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </section>
  );
}
