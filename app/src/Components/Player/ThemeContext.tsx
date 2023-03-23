// import React, { createContext, useState, ReactNode } from 'react';
//
// interface Theme {
//   background: string;
//   foreground: string;
// }
//
// interface ThemeContextProps {
//   theme: Theme;
//   setTheme: (newTheme: Theme) => void;
//   setBackgroundError: (error: string | null) => void;
// }
//
// interface ThemeProviderProps {
//   children: ReactNode;
// }
//
// const defaultTheme: Theme = {
//   background: '',
//   foreground: '',
// };
//
// const ThemeContext = createContext<ThemeContextProps>({
//   theme: defaultTheme,
//   setTheme: () => {},
//   setBackgroundError: () => {},
// });
//
// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>(defaultTheme);
//   const [backgroundError, setBackgroundError] = useState<string | null>(null);
//
//   return (
//     <ThemeContext.Provider
//       value={{
//         theme,
//         setTheme,
//         setBackgroundError,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };
//
// export default ThemeContext;
