import type { Metadata } from "next";
import { Contacts } from "@/components/root/Contact/Contacts";
import { Message } from "@/components/root/Contact/Message";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Integra Telekom. Chat, call, or visit us for support and inquiries about our internet and IT solutions.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHeader
        page="Contacts"
        title="Get in Touch"
        accent="With Us"
        subtitle="You can reach us through various channels. Whether you prefer to chat, call, or visit us in person, we are here to assist you with any inquiries or support you may need!"
      />
      <Contacts />
      <Message />
    </>
  );
}
