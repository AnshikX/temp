export const getValue = (conf) => {
  if (conf.type === "OBJECT") {
    const obj = {};
    Object.entries(conf.properties).forEach(([key, value]) => {
      obj[key] = getValue(value);
    });
    return obj;
  } else if (conf.type === "LABEL") {
    return JSON.parse(conf.value);
  } else if (conf.type === "ARRAY") {
    return conf.values.map((val) => getValue(val));
  } else if (conf.type === "STRING") {
    return conf.value?.trim() ?? "";
  } else if (conf.type === "NUMBER" || conf.type === "NUMERIC") {
    return Number(conf.value);
  } else if (conf.type === "UNDEFINED") {
    return undefined;
  } else if (conf.type === "BOOLEAN") {
    return conf.value && conf.value !== "FALSE";
  } else if (conf.type === "NULL") {
    return null;
  } else if (conf.type === "CUSTOM") {
    if (typeof conf.value === "object") return conf.value;

    // shouldn't use this
    try {
      return eval(`(${conf.value})`);
    } catch (err) {
      console.error("Failed to evaluate CUSTOM conf.value", conf.value, err);
      return undefined;
    }
  } else {
    console.warn("Unknown config type:", conf);
    return undefined;
  }
};
