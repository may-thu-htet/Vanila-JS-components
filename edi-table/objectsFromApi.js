/**
 * @typedef {Object} Device
 * @property {string} id - Unique identifier for the device.
 * @property {string} name - Name of the device.
 * @property {string} data - Concatenated string of non-object fields from device's data object.
 */

/**
 * Stores the list of devices fetched from the API.
 * This array is populated once and reused throughout the app.
 * @type {Device[]}
 */
export const devices = [];

/**
 * Fetches device data from a remote API and transforms it into a readable format.
 * The `data` field will be a string combining all top-level primitive values from the `data` object (excluding nested objects).
 *
 * @async
 * @function getDeviceData
 * @returns {Promise<Device[]>} The transformed list of devices with formatted data fields.
 */
export async function getDeviceData() {
  try {
    const response = await fetch("https://api.restful-api.dev/objects");
    const rawData = await response.json();

    const transformedDevices = rawData.map((device) => {
      const flattenedData = Object.values(device.data || {})
        .filter((val) => typeof val !== "object" && val !== null)
        .join(", ");

      return {
        id: device.id,
        name: device.name,
        data: flattenedData,
      };
    });

    devices.push(...transformedDevices);
    return transformedDevices;
  } catch (error) {
    console.error("Failed to fetch devices:", error);
    return [];
  }
}
