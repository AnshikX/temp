import {
  require_prop_types
} from "./chunk-FYNDQ25G.js";
import {
  require_jsx_runtime
} from "./chunk-Q4QFY35M.js";
import {
  require_react
} from "./chunk-ESIAYXEH.js";
import {
  __toESM
} from "./chunk-Q4XP6UTR.js";

// node_modules/@mui/private-theming/esm/ThemeProvider/ThemeProvider.js
var React3 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/utils/esm/exactProp/exactProp.js
var specialProperty = "exact-prop: ​";
function exactProp(propTypes) {
  if (false) {
    return propTypes;
  }
  return {
    ...propTypes,
    [specialProperty]: (props) => {
      const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
      }
      return null;
    }
  };
}

// node_modules/@mui/private-theming/esm/useTheme/ThemeContext.js
var React = __toESM(require_react(), 1);
var ThemeContext = React.createContext(null);
if (true) {
  ThemeContext.displayName = "ThemeContext";
}
var ThemeContext_default = ThemeContext;

// node_modules/@mui/private-theming/esm/useTheme/useTheme.js
var React2 = __toESM(require_react(), 1);
function useTheme() {
  const theme = React2.useContext(ThemeContext_default);
  if (true) {
    React2.useDebugValue(theme);
  }
  return theme;
}

// node_modules/@mui/private-theming/esm/ThemeProvider/nested.js
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";

// node_modules/@mui/private-theming/esm/ThemeProvider/ThemeProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    if (true) {
      if (!mergedTheme) {
        console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join("\n"));
      }
    }
    return mergedTheme;
  }
  return {
    ...outerTheme,
    ...localTheme
  };
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  if (true) {
    if (outerTheme === null && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const theme = React3.useMemo(() => {
    const output = outerTheme === null ? {
      ...localTheme
    } : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested_default] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return (0, import_jsx_runtime.jsx)(ThemeContext_default.Provider, {
    value: theme,
    children
  });
}
true ? ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: import_prop_types.default.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.func]).isRequired
} : void 0;
if (true) {
  true ? ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes) : void 0;
}
var ThemeProvider_default = ThemeProvider;

export {
  exactProp,
  useTheme,
  nested_default,
  ThemeProvider_default
};
/*! Bundled license information:

@mui/private-theming/esm/index.js:
  (**
   * @mui/private-theming v7.1.1
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-7LN67TGU.js.map
