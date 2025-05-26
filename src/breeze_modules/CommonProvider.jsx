
    import  { ThemeProvider } from '/src/context/ThemeContext.jsx' ;
export default function CommonProvider({ children }) {
  return (
    <><ThemeProvider>{children}</ThemeProvider></>
  );
}
    
