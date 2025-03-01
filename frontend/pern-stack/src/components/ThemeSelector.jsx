import { PaletteIcon } from 'lucide-react';
import { THEME } from '../constant/index';
import React, { useEffect } from 'react';
import { useTheme } from '../store/useTheme';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme(); // Use your store for theme management

  // Update the theme on the <html> element for client-side theming
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Apply theme dynamically
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      {/* Button to open the dropdown */}
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-haspopup="true"
        aria-expanded="false" // Update this conditionally to reflect dropdown open state
      >
        <PaletteIcon className="w-5 h-5" />
      </button>

      {/* Dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-64 border border-base-content/10"
        aria-labelledby="theme-selector"
      >
        {/* Map through the themes */}
        {THEME.map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)} // Change the theme on click
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors 
              ${theme === themeOption.name ? 'bg-primary/10 text-primary' : 'text-base-content/5'}`}
          >
            {/* Theme Icon */}
            <PaletteIcon className="w-5 h-5  text-primary" />
            
            {/* Theme Name */}
            <span className="text-sm font-medium flex-1 text-primary">{themeOption.label}</span>
            
            {/* Color circles */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
