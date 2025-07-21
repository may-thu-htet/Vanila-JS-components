/**
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user.
 * @property {string} name - Full name of the user.
 * @property {string} username - Username used by the user.
 * @property {string} email - User's email address.
 * @property {string} address - Concatenated address string (e.g., "Street, Suite, City, Zipcode").
 * @property {string} phone - Phone number.
 * @property {string} website - User's website.
 * @property {Object} company - Company information.
 * @property {string} company.name - Name of the company.
 * @property {string} company.catchPhrase - Company catch phrase.
 * @property {string} company.bs - Company business slogan.
 */

/**
 * Stores the list of users fetched from the API.
 * This array is populated once and reused throughout the app.
 * @type {User[]}
 */
export const users = [];

/**
 * Fetches user data from a remote API and transforms it to include a full address string.
 * The address field will be a string combining all top-level address values (excluding nested ones like geo).
 *
 * @async
 * @function getData
 * @returns {Promise<User[]>} The transformed list of users with formatted address.
 */
export async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const rawData = await response.json();

    const transformedUsers = rawData.map((user) => {
      const addressValues = Object.values(user.address)
        .filter((val) => typeof val !== "object") // skip nested objects like geo
        .join(", ");

      return {
        ...user,
        address: addressValues,
        company: user.company.name,
      };
    });

    users.push(...transformedUsers, ...transformedUsers);
    return transformedUsers;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}
