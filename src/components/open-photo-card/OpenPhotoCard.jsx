// src/pages/OpenPhotoCard.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebaseConfig'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore';
import './OpenPhotoCard.css'; // Custom CSS for styling

const OpenPhotoCard = () => {
  const { id } = useParams(); // Get the photo ID from the URL parameters
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        const docRef = doc(firestore, 'photoCatalogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPhoto(docSnap.data());
        } else {
          console.error('No such document!');
          setPhoto(null);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (!photo) {
    return <div className="photo-not-found">Photo not found.</div>;
  }

  // Split images into 3 columns
  const columns = [[], [], []];
  photo.images.forEach((imageUrl, index) => {
    columns[index % 3].push(imageUrl); // Distribute images across 3 columns
  });

  return (
    <div className="open-photo-card">
      <h2 className="open-photo-title">{photo.title}</h2>
      <p className="open-photo-description">{photo.description}</p>

      {/* Render images in 3 columns */}
      <div className="open-photo-images">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="open-photo-column">
            {column.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${photo.title} ${index + 1}`}
                className="open-photo-image"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenPhotoCard;
