// ThemeContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { userColors, adminColors } from "../colors";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleTheme = () => {
    setIsAdmin(!isAdmin);
  };

  const theme = isAdmin ? adminColors : userColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
