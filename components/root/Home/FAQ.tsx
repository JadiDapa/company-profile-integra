import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const faqs = [
  {
    q: "What internet packages do you offer?",
    a: "We offer various home and business internet packages, including high-speed fiber plans up to 1 Gbps.",
  },
  {
    q: "How do I check if your service is available in my area?",
    a: "You can check coverage by entering your address on our website or contacting our support team.",
  },
  {
    q: "What is the installation process like?",
    a: "A technician will visit your location, install the router, and ensure your internet is running smoothly.",
  },
  {
    q: "What should I do if my internet is slow or not working?",
    a: "Restart your router first. If the issue continues, contact our 24/7 support team for troubleshooting.",
  },
  {
    q: "Do you provide a router or can I use my own?",
    a: "We provide a free router for new installations, but you can use your own as long as it's compatible.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative flex w-full flex-col items-center justify-between px-4 py-24 lg:px-28"
    >
      <div className="relative z-10 flex-1 space-y-4">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <ChevronsRight className="text-primary size-4" />
            <p className="text-secondary font-semibold tracking-[2px] uppercase">
              FAQ
            </p>
            <ChevronsLeft className="text-primary size-4" />
          </div>
          <h2 className="max-w-2xl text-3xl font-medium lg:text-5xl">
            We Hear Every One Of
            <span className="text-primary"> Your Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              className="bg-primary rounded-tl-md rounded-tr-4xl rounded-br-md rounded-bl-4xl px-6 py-2"
              value={i.toString()}
            >
              <AccordionTrigger className="text-background text-base lg:text-lg">
                <div className="flex items-center gap-6">
                  <p className="text-4xl font-bold">{i + 1}. </p>
                  <p>{item.q}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-background">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
