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

export const getEventMasters = async () => {
  try {
    const res = await apiClient.get("/master/events");
    const data = res.data?.data || res.data;
    return {
      categories: data.categories || [],
      sponsorTypes: data.sponsorTypes || [],
      sizes: data.sizes || [],
      modes: data.modes || []
    };
  } catch (error) {
    console.error("Gagal ambil master event:", error);
    return { categories: [], sponsorTypes: [], sizes: [], modes: [] }; 
  }
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
  return res.data;
};

export const getMyEvents = async () => {
  const res = await apiClient.get('/events/me');
  return res.data;
}

export const getFastTrackEvents = async () => {
  const res = await apiClient.get("/fasttrack/me");
  return res.data.proposals;
};

export const getIncomingSponsor = async () => {
  const res = await apiClient.get("/sponsor/events-incoming");
  return res.data;
};

export const getAllSponsor = async () => {
  const res = await apiClient.get("/sponsor/all");
  return res.data;
};

export const getSponsorEO = async () => {
  const res = await apiClient.get("/events/sponsors");
  return res.data;
}

export const getEventById = async (id: string) => {
  const res = await apiClient.get(`/events/${id}`);
  return res.data.event;
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

export const sendProposalDecision = async (
  proposalId: string,
  sponsorProfileId: string,
  feedback?: string
) => {
  const res = await apiClient.post(
    `/proposals/${proposalId}/send/${sponsorProfileId}`,
    feedback ? { feedback } : {}
  );
  return res.data;
};

// 🔄 UBAH: Hapus header manual
export const createEvent = async (eventData: FormData) => {
  // Jangan set Content-Type manual! Axios akan set otomatis dengan boundary yang benar.
  const res = await apiClient.post("/events", eventData);
  return res.data;
};

// 🔄 UBAH: Hapus header manual
export const updateEvent = async (id: string, eventData: FormData) => {
  const res = await apiClient.put(`/events/${id}`, eventData);
  return res.data;
};

// Hapus Event
export const deleteEvent = async (id: string) => {
  const res = await apiClient.delete(`/events/${id}`);
  return res.data;
};