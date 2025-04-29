import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CustomButton from "../components/button.jsx";
import Loader from "../components/loader.jsx";
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
        setPreview(URL.createObjectURL(file));
        break;
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
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
    <div
      id="root"
      onPaste={onPaste}
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "100px",
      }}
    >
      {loading && (
        <div className="overlay">
          {/* <Loader /> */}
          <DotLottieReact
            src="https://lottie.host/5567e975-2890-461b-9f73-d25d29086e1c/XzrdaFH3SX.lottie"
            loop
            autoplay
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}

      {/* Info Button */}
      <button
        onClick={openInfoModal}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
          fontSize: "24px",
          color: "white",
          fontWeight: "bold",
          transition: "all 0.3s ease"
        }}
        className="info-button"
      >
        i
      </button>

      <h1 className="Head704px">AI Generated Fake Face Detection</h1>

      <div
        className="box"
        style={{
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          width: "25%",
          maxWidth: "1200px",
          textAlign: "center",
          border: "5px solid #ffffff",
          borderRadius: "20px",
          boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.8)",
          backgroundColor: "#ffffff",
          color: "#000",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <form onSubmit={handleSubmit}>
          {!preview && (
            <div
              className="glow_button"
              {...getRootProps()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                borderRadius: "20px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <input {...getInputProps()} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    color: "#fff",
                  }}
                >
                  +
                </div>
              </div>
              <p>Drag & drop an image here, or click to select one</p>
            </div>
          )}

          {preview && (
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              <button
                onClick={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  backgroundColor: "transparent",
                  color: "#000",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  lineHeight: "1",
                }}
              >
                <span className="glowing-text">×</span>
              </button>
              <img
                src={croppedImage || preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
        </form>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {(preview || croppedImage) && ( // This ensures buttons appear only if an image is uploaded
          <>
            <CustomButton onClick={handleSubmit} />
            <div style={{ padding: "20px" }}>
              <CropButton onClick={openCropModal} />
            </div>
          </>
        )}
      </div>

      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          fontSize: "9.5em",
          color: prediction === "real" ? "green" : "red", // Conditional color based on prediction
          fontFamily: "Georgia, serif", // Change this to any font you prefer
        }}
      >
        {prediction}
      </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "600px",
          position: "absolute",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "red",
            marginTop: "20px",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          {error && (
            <div
              style={{
                color: "red",
                marginTop: "20px",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <strong> </strong> server offline failed to fetch result
              <DotLottieReact
                src="https://lottie.host/4292a27c-d1a4-471e-99ba-343c124f275d/GGXqKHecIM.lottie"
                loop
                autoplay
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}

          {prediction && prediction !== "Error" && (
            <div style={{ marginTop: "30px" }}>
              <h3 style={{ fontSize: "1.5em", color: "#ffffff" }}>
                The uploaded image is {prediction} with Confidence of{" "}
                {confidence}
              </h3>
            </div>
          )}
        </div>
      </div>

      {isCropModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CropComponent
              imageSrc={preview}
              setCroppedImage={setCroppedImage}
              closeModal={closeCropModal}
            />
          </div>
        </div>
      )}

      {/* Info Modal */}
      <InfoModal isOpen={isInfoModalOpen} onClose={closeInfoModal} />

      {/* Add some CSS to extend the existing styles */}
      <style jsx>{`
        .info-button:hover {
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        
        .modal-content {
          background-color: white;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        
        .modal-close-button:hover {
          background-color: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;