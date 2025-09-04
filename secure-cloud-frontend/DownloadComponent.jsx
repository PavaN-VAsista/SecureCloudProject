// frontend/src/DownloadPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage'; // We'll reuse your existing login form

const DownloadPage = ({ token, setToken, setUserEmail, setUserRoles }) => {
  const [shareDetails, setShareDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // This function will be passed to the LoginPage component
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Optionally, you can try to automatically download after login
    // For simplicity, we'll let the user click the download button again.
  };

  const handleDownload = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/share/download/${token}`, {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: 'blob', // Important for file downloads
      });

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', shareDetails.fileId.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      setError(err.response?.data?.message || 'Download failed. Please ensure you are logged in as the correct recipient.');
    }
  };

  // We don't have a public endpoint to get share details, 
  // so we'll just show a generic message until the user logs in.

  return (
    <div className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
          Secure File Download
        </h2>
        
        {error && <p className="text-red-400 mb-4">{error}</p>}

        {!isLoggedIn ? (
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
            <p className="mb-6 text-lg">A file has been shared with you. Please log in to download it.</p>
            <LoginPage 
              onLogin={handleLoginSuccess}
              setToken={setToken}
              setUserEmail={setUserEmail}
              setUserRoles={setUserRoles}
            />
          </div>
        ) : (
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
            <p className="mb-6 text-lg">You are logged in. Click the button below to download the file.</p>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg"
            >
              Download File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;