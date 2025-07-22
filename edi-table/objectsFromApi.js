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

// https://api.escuelajs.co/api/v1/products [API for editing and deleting]
export async function getDeviceData() {
  try {
    const response = await fetch("https://api.restful-api.dev/objects");
    const rawData = await response.json();

    // Map each device to an object with only the first 4 keys
    const transformedDevices = rawData.map((device) => {
      const keys = Object.keys(device).slice(0, 4);
      const dataObj = {};
      keys.forEach((key) => {
        dataObj[key] = device[key];
      });
      return dataObj;
    });

    devices.push(...transformedDevices);
    return transformedDevices;
  } catch (error) {
    console.error("Failed to fetch devices:", error);
    return [];
  }
}
