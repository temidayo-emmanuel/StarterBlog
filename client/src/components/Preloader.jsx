// src/components/Loader.js
import React from 'react';
import load from "../assets/load.gif"

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={load} alt="Loading..." />
    </div>
  );
};

export default Preloader;