import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = ({ rightButton }) => (
  <header className="flex justify-between items-center py-4 px-6 border-b shadow-sm dark:border-gray-700">
    <h1 className="text-xl font-bold">
      <i className="fas fa-book mr-2 text-blue-600" />Notes App
    </h1>
    <div className="flex items-center gap-4">
      {rightButton}
      <ThemeToggle />
    </div>
  </header>
);

export default Header;