import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import CustomButton from "../components/button.jsx";
import CropButton from "../components/cropButton.jsx";
import CropComponent from "../components/crop";
import InfoModal from "./infoModal.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./App.css";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  // Reference to the result container for scrolling
  const resultContainerRef = useRef(null);

  // Scroll to result when prediction or error changes
  useEffect(() => {
    if ((prediction || error) && resultContainerRef.current) {
      resultContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [prediction, error]);

  // Convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setCroppedImage(null);
    setError("");
    setPrediction("");
    setConfidence("");
    setPreview(URL.createObjectURL(file));
  }, []);

  const onPaste = useCallback((event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        setFile(file);
        setCroppedImage(null);
        setError("");
        setPrediction("");
        setConfidence("");
        setPreview(URL.createObjectURL(file));
        break;
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    noClick: !!file,
    noDrag: !!file,
  });

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setPrediction("");
    setConfidence("");
    setError("");
    setCroppedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !croppedImage) {
      setError("Please select an image file.");
      return;
    }

    const formData = new FormData();

    if (croppedImage) {
      const blob = dataURLtoBlob(croppedImage);
      const croppedFile = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });
      formData.append("image", croppedFile);
    } else {
      formData.append("image", file);
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setError("");
    } catch (error) {
      console.error("Error:", error.message);
      setPrediction("Error");
      setConfidence("0%");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openCropModal = () => setIsCropModalOpen(true);
  const closeCropModal = () => setIsCropModalOpen(false);

  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  return (
    <div className="app-container" onPaste={onPaste}>
      {loading && (
        <div className="overlay">
          <DotLottieReact
            src="https://lottie.host/5567e975-2890-461b-9f73-d25d29086e1c/XzrdaFH3SX.lottie"
            loop
            autoplay
            className="loading-animation"
          />
        </div>
      )}

      {/* Info Button */}
      <button onClick={openInfoModal} className="info-button" aria-label="Information">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>

      <h1 className="app-title">AI Generated Face Detection</h1>

      <div className="main-content">
        <div className="upload-container">
          <form onSubmit={handleSubmit}>
            {!preview && (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <div className="upload-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p>Drag & drop an image here, or click to select one</p>
               
              </div>
            )}

            {preview && (
              <div className="preview-container">
                <button onClick={handleRemoveImage} className="remove-image-button" aria-label="Remove image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <img src={croppedImage || preview} alt="Preview" className="image-preview" />
              </div>
            )}
          </form>
        </div>

        {(preview || croppedImage) && (
          <div className="action-buttons">
            <CustomButton onClick={handleSubmit} />
            <CropButton onClick={openCropModal} />
          </div>
        )}

        {(prediction || error) && (
          <div className="result-container" ref={resultContainerRef}>
            {error && (
              <div className="error-message">
                <span>Server offline - failed to fetch result</span>
                <DotLottieReact
                  src="https://lottie.host/4292a27c-d1a4-471e-99ba-343c124f275d/GGXqKHecIM.lottie"
                  loop
                  autoplay
                  className="error-animation"
                />
              </div>
            )}

            {prediction && prediction !== "Error" && (
              <div className={`prediction-result ${prediction.toLowerCase()}`}>
                <h3>
                  The uploaded image is <span className="prediction-text">{prediction}</span>
                  <br />
                  <span className="confidence-text">Confidence: {confidence}</span>
                </h3>
              </div>
            )}
          </div>
        )}
      </div>

      {isCropModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content crop-modal" onClick={(e) => e.stopPropagation()}>
            <CropComponent imageSrc={preview} setCroppedImage={setCroppedImage} closeModal={closeCropModal} />
          </div>
        </div>
      )}

      <InfoModal isOpen={isInfoModalOpen} onClose={closeInfoModal} />
    </div>
  );
};

export default ImageUploader;
