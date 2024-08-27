import React, { useState, useEffect } from "react";

const BASE_URL = "https://localhost:7242/api/";
function GGDrive({ fileId }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch(BASE_URL+"Image/GetImage/" + fileId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob(); // Use blob to handle image data
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Google Drive" />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default GGDrive;
