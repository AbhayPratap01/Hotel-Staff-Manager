const API_URL = "https://testaug.onrender.com/api/staff";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function getStaff(page = 1, limit = 10) {
  const response = await fetch(
    `${API_URL}?page=${page}&limit=${limit}`
  );

  return handleResponse(response);
}

export async function createStaff(staff) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff),
  });

  return handleResponse(response);
}

export async function updateStaff(id, staff) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff),
  });

  return handleResponse(response);
}

export async function deleteStaff(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}