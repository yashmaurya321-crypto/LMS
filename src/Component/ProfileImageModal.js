import React, { useState } from 'react';
import customaxios from '../Component/Customaxios';
import '../Css/ProfileImageModal.css';
import { AiOutlineClose } from 'react-icons/ai';  // Close icon
import { FiCamera } from 'react-icons/fi';      // Camera icon

const ProfileImageModal = ({ isOpen, onClose, onSuccess, userId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  console.log('from uploaded: ', userId);

  const handleOverlayClick = (e) => {
    onClose();
  };

  const handleImageSelect = async(e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setError('');
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image');
      return;
    }
  
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('profileImage', selectedImage);  // Append image file
      formData.append('userId', userId);  // Append userId
  
      const res = await customaxios.post('/api/user/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
  
      if (res.status === 200) {
        // Get user data from local storage
        const user = JSON.parse(localStorage.getItem('user'));  // Parse to get the object
  
        if (user) {
          // Update user data with the new image URL
          user.image = res.data.user.image;  // Assuming the backend returns the image URL in res.data.user.image
  
          // Store the updated user data back into local storage
          localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
  
          console.log("Updated user from backend:", user);  // Log the updated user data
        }
  
        onClose();  // Close the modal after upload is successful
        window.location.reload();  // Reload the page to reflect the changes
      } else {
        setError(res.data.message);  // Show error if status is not 200
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Clean up preview URL when component unmounts or modal closes
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Profile Picture</h2>
          <button 
            type="button"
            className="close-button" 
            onClick={() => { onClose(); }}
            aria-label="Close modal"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div className="image-preview-container">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="image-preview"
              />
            ) : (
              <div className="upload-placeholder">
                <FiCamera size={48} color="#ccc" />
                <p>Click or drag image to upload</p>
              </div>
            )}
          </div>

          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="file-input"
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              Choose File
            </label>
            {selectedImage && (
              <span className="selected-file-name">
                {selectedImage.name}
              </span>
            )}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !selectedImage}
            className={`upload-button ${isUploading ? 'uploading' : ''}`}
          >
            {isUploading ? (
              <>
                <span className="spinner">⟳</span>
                <span>Uploading...</span>
              </>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;
