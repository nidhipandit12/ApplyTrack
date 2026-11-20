const API_URL = "http://localhost:5000/api/applications";

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getApplications = async () => {
    const response = await fetch(API_URL, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to fetch applications");
    }

    return response.json();
};

export const createApplication = async (applicationData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(applicationData)
    });

    if (!response.ok) {
        throw new Error("Unable to save application");
    }

    return response.json();
};

export const updateApplication = async (id, applicationData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(applicationData)
    });

    if (!response.ok) {
        throw new Error("Unable to update application");
    }

    return response.json();
};

export const deleteApplication = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to delete application");
    }

    return response.json();
};