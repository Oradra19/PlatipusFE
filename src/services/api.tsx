import apiClient from "./axiosInstance";

export const getProfile = async () => {
  const res = await apiClient.get("/profile");
  return res.data;
};

export const updateProfile = async (payload: {
  company_name?: string;
  status?: "Open" | "Closed";
  sponsor_category_id?: number | null;
  sponsor_type_id?: number[] | null;
  sponsor_scope_id?: number | null;
  budget_min?: number | null;
  budget_max?: number | null;
}) => {
  const res = await apiClient.put("/profile", payload);
  return res.data;
};

export const getSponsorMasters = async () => {
  const res = await apiClient.get("/master/sponsors");
  return res.data;
};

export const uploadProfileLogo = async (
  file: File,
  companyName: string,
  status: "Open" | "Closed"
) => {
  const formData = new FormData();
  formData.append("profile_picture", file);
  formData.append("company_name", companyName);
  formData.append("status", status);
  const res = await apiClient.put("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllEvents = async () => {
  const res = await apiClient.get("/events");
  return res.data.events;
};

export const getFastTrackEvents = async () => {
  const res = await apiClient.get("/proposal/fasttrack/me");
  return res.data.proposals;
};

export const getIncomingProposals = async () => {
  const res = await apiClient.get("/sponsor/incoming");
  return res.data;
};