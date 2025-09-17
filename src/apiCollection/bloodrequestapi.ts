import { API_BASE_URL } from "@/lib/api";

export const getBloodRequests = async () => {
    const bloodRequests = await fetch(`${API_BASE_URL}/blood-requests/get-blood-requests`, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return bloodRequests.json();
}