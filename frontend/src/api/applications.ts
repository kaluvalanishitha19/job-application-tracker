import { apiClient } from "./client";
import type { Application, ApplicationCreate } from "../types/application";

export async function getApplications(status?: string): Promise<Application[]> {
  const response = await apiClient.get<Application[]>("/api/applications/", {
    params: status ? { status } : {},
  });
  return response.data;
}

export async function getApplication(id: number): Promise<Application> {
  const response = await apiClient.get<Application>(`/api/applications/${id}`);
  return response.data;
}

export async function createApplication(data: ApplicationCreate): Promise<Application> {
  const response = await apiClient.post<Application>("/api/applications/", data);
  return response.data;
}

export async function updateApplication(
  id: number,
  data: Partial<ApplicationCreate>
): Promise<Application> {
  const response = await apiClient.patch<Application>(`/api/applications/${id}`, data);
  return response.data;
}

export async function deleteApplication(id: number): Promise<void> {
  await apiClient.delete(`/api/applications/${id}`);
}