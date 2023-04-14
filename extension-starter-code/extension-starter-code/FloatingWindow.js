import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./FloatingWindow.css";

const FloatingWindow = ({ selectedText, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="floating-window"
      style={{
        top: position.y + 20,
        left: position.x + 20,
      }}
    >
      <div className="floating-window-header">
        <span>{selectedText}</span>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="floating-window-body">
        {/* Add additional features such as copy to clipboard, share, and text editing */}
      </div>
    </div>
  );
};

FloatingWindow.propTypes = {
  selectedText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FloatingWindow;
