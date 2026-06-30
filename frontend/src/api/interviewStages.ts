import { apiClient } from "./client";
import type { InterviewStage } from "../types/application";

export async function getInterviewStages(applicationId: number): Promise<InterviewStage[]> {
  const response = await apiClient.get<InterviewStage[]>("/api/interview-stages/", {
    params: { application_id: applicationId },
  });
  return response.data;
}

export async function createInterviewStage(
  applicationId: number,
  stageName: string
): Promise<InterviewStage> {
  const response = await apiClient.post<InterviewStage>("/api/interview-stages/", {
    application_id: applicationId,
    stage_name: stageName,
  });
  return response.data;
}