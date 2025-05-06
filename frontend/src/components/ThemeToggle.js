import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    setIsDark(darkMode);
    if (darkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      <i
        className={`fas ${isDark ? 'fa-moon' : 'fa-sun'} text-yellow-500 dark:text-blue-400 text-lg transition-transform duration-500 transform ${
          isDark ? 'rotate-0' : 'rotate-180'
        }`}
      ></i>
    </button>
  );
};

export default ThemeToggle;
