import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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
          {[1, 2, 3, 4, 5].map((_, i) => (
            <AccordionItem
              key={i}
              className="bg-primary rounded-tl-md rounded-tr-4xl rounded-br-md rounded-bl-4xl px-6 py-2"
              value={i.toString()}
            >
              <AccordionTrigger className="text-background text-base lg:text-lg">
                <div className="flex items-center gap-6">
                  <p className="text-4xl font-bold">{i + 1}. </p>
                  <p>How can I contact you?</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-background">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
