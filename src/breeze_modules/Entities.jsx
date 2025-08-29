
const entities = {}
const entityDetails = {
  "2e8e60cc_b74a_4a34_9cf1_a6887ea85c1b": {
    "exportedAs": "App",
    "from": "/src/App.jsx",
    "default": true
  },
  "PROJECT_ROUTER": {
    "exportedAs": "router",
    "from": "/src/Routing.jsx",
    "default": true
  },
  "STYLES_MASTER": {
    "exportedAs": "stylesMaster",
    "from": "/src/stylesMaster.jsx",
    "default": false
  },
  "THEME_CSS": {
    "exportedAs": "ThemeContext",
    "from": "/src/styles/ThemeContext.css",
    "default": false
  },
  "THEME_HOOK": {
    "exportedAs": "useThemeContext",
    "from": "/src/context/ThemeContext.jsx",
    "default": false
  },
  "THEME_PROVIDER": {
    "exportedAs": "ThemeProvider",
    "from": "/src/context/ThemeContext.jsx",
    "default": false
  },
  "f983ca5e_91a1_4c1a_afad_d06a35645eba": {
    "exportedAs": "Main",
    "from": "/src/components/Main.jsx",
    "default": true
  }
}



export async function loadEntity(id) {
  const { from, default: isDefault } = entityDetails[id];
  if (!entities[id]) {
    try {
      const module = await import(from);
      const entity = isDefault
        ? module.default
        : module[entityDetails[id]["exportedAs"]];
      entities[id] = entity;
    } catch (error) {
      console.error(`Failed to load ${from}:`, error);
    }
  }
  return entities[id];
}

