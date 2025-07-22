const BASE_URL = "http://localhost:3000/api/products";

/**
 * Sends a PUT request to update a device on the server.
 * @param {string} id - The ID of the device.
 * @param {object} data - The data to update (e.g., { name: "New Name", data: "Updated data" }).
 * @returns {Promise<object>} - The updated device data from the server.
 */
export async function updateDevice(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update device with ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
}

export async function name(params) {}

/**
 * Sends a DELETE request to remove a device.
 * @param {string} id - The ID of the device.
 * @returns {Promise<boolean>} - Returns true if delete succeeded.
 */
export async function deleteDevice(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete device with ID ${id}`);
    }

    return true;
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
}
