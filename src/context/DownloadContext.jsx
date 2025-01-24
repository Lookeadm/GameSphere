import React, { createContext, useState } from 'react';

// Tạo context
export const DownloadContext = createContext();

// Tạo provider cho context
export const DownloadProvider = ({ children }) => {
    const [downloadedFileUri, setDownloadedFileUri] = useState(null);

    return (
        <DownloadContext.Provider value={{ downloadedFileUri, setDownloadedFileUri }}>
            {children}
        </DownloadContext.Provider>
    );
};