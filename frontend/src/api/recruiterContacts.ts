import { apiClient } from "./client";
import type { RecruiterContact } from "../types/application";

export async function getRecruiterContacts(applicationId: number): Promise<RecruiterContact[]> {
  const response = await apiClient.get<RecruiterContact[]>("/api/recruiter-contacts/", {
    params: { application_id: applicationId },
  });
  return response.data;
}