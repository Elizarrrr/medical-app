export default function generateSlug(title:string) {
  if (!title || typeof title !== "string") {
    throw new Error("Invalid title. Please provide a string.");
  }

  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace at the start and end
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}