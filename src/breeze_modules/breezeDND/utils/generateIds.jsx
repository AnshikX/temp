import deepCopy from "../../utils/deepcopy";
import generate_uuid from "../../utils/UuidGenerator";

export const generateIdFromTemplate = (item) => {
  if (!item || typeof item !== "object") return item;

  const clonedItem = deepCopy(item);

  if (clonedItem.icon) {
    delete clonedItem.icon;
  }

  let jsonStr = JSON.stringify(clonedItem);

  if (clonedItem.elementType === "THIRD_PARTY" && clonedItem.exampleConfig) {
    jsonStr = JSON.stringify(clonedItem.exampleConfig);
  }

  // Replace ${DEFAULT_ID} with a new UUID every time it's found
  jsonStr = jsonStr.replace(/\$\{DEFAULT_ID\}/g, () => generate_uuid());

  // Replace other placeholders consistently
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
