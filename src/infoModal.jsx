import React from "react";
import ProjectInfo from "./info";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content info-modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "900px",
          height: "85vh",
          padding: "0",
          backgroundColor: "transparent",
          overflowY: "auto"
        }}
      >
        <button 
          className="modal-close-button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "10",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)"
          }}
        >
          ×
        </button>
        <ProjectInfo />
      </div>
    </div>
  );
};

export default InfoModal;