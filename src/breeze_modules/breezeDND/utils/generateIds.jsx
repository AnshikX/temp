import generate_uuid from "../../utils/UuidGenerator";

// Replaces all ID placeholders in the form of ${...} with fresh UUIDs.
export const generateIdFromTemplate = (item) => {
  if (!item || typeof item !== "object") return item;
  if (item.icon){
    delete item.icon;
  }

  let jsonStr = JSON.stringify(item);
  
  if(item.elementType === "THIRD_PARTY" && item.exampleConfig) {
    jsonStr = JSON.stringify(item.exampleConfig);
  }

  const placeholderMap = {};

  // Replace all occurrences of ${...} with new UUIDs
  jsonStr = jsonStr.replace(/\$\{([^}]+)\}/g, (_, key) => {
    if (!placeholderMap[key]) {
      placeholderMap[key] = generate_uuid();
    }
    return placeholderMap[key];
  });

  return JSON.parse(jsonStr);
};
