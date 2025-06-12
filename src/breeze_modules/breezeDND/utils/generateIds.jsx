import generate_uuid from "../../utils/UuidGenerator";

export const generateIdFromTemplate = (item) => {
  if (!item || typeof item !== "object") return item;
  if (item.icon) {
    delete item.icon;
  }

  let jsonStr = JSON.stringify(item);

  if (item.elementType === "THIRD_PARTY" && item.exampleConfig) {
    jsonStr = JSON.stringify(item.exampleConfig);
  }

  // Replace ${DEFAULT_ID} with a new UUID every time it's found
  jsonStr = jsonStr.replace(/\$\{DEFAULT_ID\}/g, () => generate_uuid());

  // For other placeholders, keep shared logic
  const placeholderMap = {};
  jsonStr = jsonStr.replace(/\$\{([^}]+)\}/g, (match, key) => {
    if (key === "DEFAULT_ID") return match;
    if (!placeholderMap[key]) {
      placeholderMap[key] = generate_uuid();
    }
    return placeholderMap[key];
  });

  return JSON.parse(jsonStr);
};
