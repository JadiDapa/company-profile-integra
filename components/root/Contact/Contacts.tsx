"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, MessageSquare, Bell } from "lucide-react";

const contactItems = [
  {
    title: "Chat to sales",
    description: "Speak to our friendly team.",
    buttonText: "Chat to sales",
    icon: <MessageSquare className="text-primary size-24" />,
  },
  {
    title: "Chat to support",
    description: "We're here to help.",
    buttonText: "Chat to support",
    icon: <Bell className="text-primary size-24" />,
  },
  {
    title: "Visit us",
    description: "Visit our office HQ.",
    buttonText: "Get directions",
    icon: <MapPin className="text-primary size-24" />,
  },
  {
    title: "Call us",
    description: "Mon–Fri from 8am to 5pm.",
    buttonText: "Call our team",
    icon: <Phone className="text-primary size-24" />,
  },
];

export function Contacts() {
  return (
    <section
      id="contact"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between gap-16 px-4 py-12 lg:px-24 lg:py-32"
    >
      <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-center">
        <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
          Contact Us!
        </h2>
        <p className="text-muted-foreground mt-2">
          Ready to help your company scale faster? Let’s chat about how we can
          help.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {contactItems.map((item, index) => (
          <Card
            key={index}
            className="relative h-full overflow-hidden text-center shadow-xl"
          >
            <CardContent className="flex flex-col gap-6 p-6">
              <div className="absolute top-0 right-0 flex rotate-12 items-center justify-center rounded-bl-md p-4 opacity-20">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
              <Button className="mx-auto w-full text-sm">
                {item.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
