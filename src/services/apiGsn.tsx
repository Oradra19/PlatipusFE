import apiClient from "./axiosInstance";

export const getAllEvents = async () => {
  const res = await apiClient.get("/events");
  return res.data.events;
};

export const getIncomingProposals = async () => {
  const res = await apiClient.get("/sponsor/events-incoming");
  return res.data;
};

export const submitProposalFeedback = async (
  proposalSponsorId: string,
  status: "ACCEPTED" | "REJECTED",
  feedback?: string
) => {
  const res = await apiClient.put(`/proposal/${proposalSponsorId}`, {
    status,
    feedback,
  });
  return res.data;
};

export const reviewIncomingProposal = async (
  eventSponsorId: string,
  decision: "ACCEPT" | "REJECT",
  feedback?: string | null
) => {
  const res = await apiClient.post(
    `/sponsor/events-incoming/${eventSponsorId}/review`,
    {
      decision,
      feedback: feedback ?? null,
    }
  );
  return res.data;
};