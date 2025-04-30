"use client"

import { useRef } from "react"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import styled from "styled-components"

const CropComponent = ({ imageSrc, setCroppedImage, closeModal }) => {
  const cropperRef = useRef(null)

  const handleConfirm = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper
      const croppedDataURL = cropper.getCroppedCanvas().toDataURL()
      setCroppedImage(croppedDataURL)
      closeModal()
    }
  }

  return (
    <StyledCropContainer>
      <div className="crop-header">
        <h2>Crop Your Image</h2>
        <p className="crop-instructions">To achieve better results, avoid cropping any part of the face.</p>
      </div>

      <div className="cropper-wrapper">
        <Cropper
          src={imageSrc}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          ref={cropperRef}
          guides={true}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
        />
      </div>

      <div className="crop-actions">
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </StyledCropContainer>
  )
}

const StyledCropContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 16px;
  overflow: hidden;
  
  .crop-header {
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #7a5af8, #df71ff);
    color: white;
    
    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .crop-instructions {
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
  
  .cropper-wrapper {
    width: 100%;
    background: #f0f0f0;
    
    .cropper-view-box {
      outline: 1px solid #7a5af8;
      outline-color: rgba(122, 90, 248, 0.75);
    }
    
    .cropper-point {
      background-color: #7a5af8;
    }
    
    .cropper-line {
      background-color: #7a5af8;
    }
  }
  
  .crop-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    
    button {
      min-width: 120px;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s ease;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
    
    .confirm-button {
      background: linear-gradient(135deg, #7a5af8, #df71ff);
      color: white;
      border: none;
      box-shadow: 0 4px 10px rgba(122, 90, 248, 0.3);
      
      &:hover {
        box-shadow: 0 6px 15px rgba(122, 90, 248, 0.4);
      }
    }
    
    .cancel-button {
      background: white;
      color: #333;
      border: 1px solid #ddd;
      
      &:hover {
        background: #f5f5f5;
        border-color: #ccc;
      }
    }
  }
  
  @media (max-width: 768px) {
    .crop-header {
      padding: 1rem 1.5rem;
      
      h2 {
        font-size: 1.25rem;
      }
    }
    
    .crop-actions {
      padding: 1rem;
      
      button {
        min-width: 100px;
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    .crop-header {
      padding: 0.75rem 1rem;
      
      h2 {
        font-size: 1.1rem;
      }
      
      .crop-instructions {
        font-size: 0.8rem;
      }
    }
    
    .crop-actions {
      flex-direction: column;
      gap: 0.5rem;
      
      button {
        width: 100%;
      }
    }
  }
`

export default CropComponent
