import React from 'react';

const BackButton = ({ onClick }) => {
  const handleBack = () => {
    if (onClick) {
      onClick(); // Trigger custom functionality if needed
    } else {
      window.history.back(); // Use browser's back navigation
    }
  };

  return (
    <button className="custom-back-btn" onClick={handleBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow-icon"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      Back
    </button>
  );
};

export default BackButton;