"use client"
import ProjectInfo from "./info"
import styled from "styled-components"

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <StyledModalOverlay onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        <ProjectInfo />
      </div>
    </StyledModalOverlay>
  )
}

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  
  .modal-content {
    width: 90%;
    max-width: 900px;
    height: 85vh;
    background-color: transparent;
    overflow-y: auto;
    position: relative;
    border-radius: 16px;
    animation: scaleIn 0.3s ease-out;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #9cecfb, #65c7f7);
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #65c7f7, #0052d4);
    }
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
    font-size: 20px;
    font-weight: bold;
    
    &:hover {
      background: rgba(223, 113, 255, 0.8);
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
      height: 90vh;
    }
  }
  
  @media (max-width: 480px) {
    .close-button {
      top: 10px;
      right: 10px;
      width: 36px;
      height: 36px;
      font-size: 18px;
    }
  }
`

export default InfoModal
