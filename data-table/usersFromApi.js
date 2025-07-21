export async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}
