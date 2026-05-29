import { setRequestLocale } from "next-intl/server";
import { getContactData } from "@/services/api/contact.service";
import { ContactView } from "@/features/contact/components/ContactView";

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = await getContactData();
  return <ContactView data={data} />;
}
