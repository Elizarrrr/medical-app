export function generateInitials(name: string | null | undefined): string {
    if (!name) return "CN";
  
    // Split the name by spaces, filter out empty parts, and map to initials
    const initials = name
      .split(" ")
      .filter((part) => part.trim() !== "") // Ignore empty parts
      .map((part) => part[0].toUpperCase()) // Take the first letter and make it uppercase
      .join(""); // Combine the initials
  
    return initials;
}