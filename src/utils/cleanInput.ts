export default function cleanInput(value: string) {
  const trimmedInput = value.trim();

  const match = trimmedInput.match(/\d+(\.\d+)?/);
  if (match) {
    // Ensures match is not null
    return match[0]; // `match[0]` is safe to access
  }

  // If the input is a pure number, treat it as a price filter
  if (/^\d+(\.\d+)?$/.test(trimmedInput)) {
    return trimmedInput; // Convert to a number
  }

  // Otherwise, clean the text input for location/products
  return trimmedInput.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
}
