import React, { useState } from 'react';
import { Button } from './Button';
import { getAllowedExtensionsString } from '../config/fileTypes';
import './UploadPage.css';

interface UploadPageProps {
    onUploadComplete: (file: File) => void;
    onBack: () => void;
    onCancel: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onUploadComplete, onBack, onCancel }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showError, setShowError] = useState(false);

    const allowedExtensions = getAllowedExtensionsString();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowError(false);
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            // Stubbing the actual upload mechanism for now based on the flow design
            onUploadComplete(selectedFile);
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="upload-page-container">
            <div className="back-link-container">
                <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); onBack(); }}>&lt; Back</a>
            </div>

            <h1>Please upload an Audio or Video file</h1>

            <p className="upload-description">
                Choose a file from your computer or device that contains the recording of the Evidence by Commission procedure.
            </p>

            <p className="upload-file-types">
                <strong>Supported formats:</strong> {allowedExtensions}
            </p>

            <div className="upload-form-group">
                {/* Natively accessible label directly linked to the file input via htmlFor */}
                <label htmlFor="ebc-media-upload" className="upload-label">
                    Select an audio or video file from your device:
                </label>

                <p className="upload-input-subtext">
                    Drag & drop a file or click "Choose file" to browse your device.
                </p>

                {/* Native file input configured strictly to the central fileType specs */}
                <input
                    id="ebc-media-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept={allowedExtensions}
                    className="upload-input"
                    aria-describedby="upload-help-text upload-error-text"
                />
                <div id="upload-help-text" className="upload-help-text visually-hidden">
                    Use the file browser window to pick an allowed audio or video extension type.
                </div>
                {showError && (
                    <div id="upload-error-text" className="upload-error-msg" role="alert">
                        Error: No file selected. Please select a file before continuing.
                    </div>
                )}
            </div>

            <div className="upload-actions">
                {/* Uses design system Buttons */}
                <Button
                    onClick={handleUploadClick}
                    aria-label="Upload selected file"
                >
                    Upload and Continue
                </Button>

                <Button
                    variant="secondary"
                    onClick={onCancel}
                    aria-label="Cancel and go back"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};
