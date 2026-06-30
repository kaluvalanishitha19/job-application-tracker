import { apiClient } from "./client";
import type { AIInsight } from "../types/application";

export async function getAIInsights(applicationId: number): Promise<AIInsight[]> {
  const response = await apiClient.get<AIInsight[]>("/api/ai-insights/", {
    params: { application_id: applicationId },
  });
  return response.data;
}

export async function generateAIInsight(
  applicationId: number,
  insightType: "keyword_extraction" | "jd_summary" | "interview_prep"
): Promise<AIInsight> {
  const response = await apiClient.post<AIInsight>("/api/ai-insights/", {
    application_id: applicationId,
    insight_type: insightType,
  });
  return response.data;
}