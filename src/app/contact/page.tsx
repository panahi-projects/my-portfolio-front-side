import { getContactData } from "@/services/api/contact.service";
import { ContactView } from "@/features/contact/components/ContactView";

export default async function ContactPage() {
  const data = await getContactData();
  return <ContactView data={data} />;
}
