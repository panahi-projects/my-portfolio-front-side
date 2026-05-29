import type { ContactData } from "@/features/contact/types";
import { contactMock } from "./mock/contact.mock";

/** Returns the Contact page data. */
export async function getContactData(): Promise<ContactData> {
  // TODO: Replace with real API call
  return contactMock;
}
