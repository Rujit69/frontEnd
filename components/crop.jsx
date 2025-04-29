import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@mui/material";
import "./component.css";


const CropComponent = ({ imageSrc, setCroppedImage, closeModal }) => {
  const cropperRef = useRef(null);

  const handleConfirm = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedDataURL = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataURL);
      closeModal();
    }
  };

  return (
    <div
      className="crop-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#333",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Crop Your Image
      </div>

      {/* Add instructions */}
      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "15px",
          fontSize: "0.9rem",
        }}
      >
        To achieve better results, avoid cropping any part of the face.
      </p>

      <Cropper
        src={imageSrc}
        style={{ height: 400, width: "100%" }}
        initialAspectRatio={1}
        ref={cropperRef}
      />

      <div
        style={{
          display: "flex",

          marginTop: "10px",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="cropbutton"
          onClick={handleConfirm}
          style={{ marginRight: "10px" }}
        >
          Confirm
        </button>
        <button
          className="canclebutton"
          onClick={closeModal}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CropComponent;
