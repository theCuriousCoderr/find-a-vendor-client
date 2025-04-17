import { v4 as uuidv4 } from "uuid";

let uniqueString = "";

// axios Request interceptor
function getUniqueString() {
  if (uniqueString) return uniqueString;
  uniqueString = uuidv4();
  return uniqueString;
}

// axios Response interceptor
function clearUniqueString() {
  uniqueString = "";
}

export { getUniqueString, clearUniqueString };


