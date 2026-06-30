import { apiClient } from "./client";
import type { RecruiterContact } from "../types/application";

export async function getRecruiterContacts(applicationId: number): Promise<RecruiterContact[]> {
  const response = await apiClient.get<RecruiterContact[]>("/api/recruiter-contacts/", {
    params: { application_id: applicationId },
  });
  return response.data;
}
export async function createRecruiterContact(
  applicationId: number,
  name: string,
  email?: string
): Promise<RecruiterContact> {
  const response = await apiClient.post<RecruiterContact>("/api/recruiter-contacts/", {
    application_id: applicationId,
    name,
    email,
  });
  return response.data;
}