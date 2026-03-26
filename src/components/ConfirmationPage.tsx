import React from 'react';
import { Button } from './Button';
import './ConfirmationPage.css';

interface ConfirmationPageProps {
    onRestart: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onRestart }) => {
    return (
        <div className="confirmation-page-container">
            <div className="success-banner">
                <h1 className="confirmation-title">Thank you for submitting an audio / video file for a transcript</h1>
            </div>

            <p className="confirmation-description">
                The transcription service runs overnight. You should receive a word document around 8pm this evening.
            </p>

            <div className="confirmation-actions">
                <Button onClick={onRestart} aria-label="Submit another file">
                    Submit another file
                </Button>
            </div>
        </div>
    );
};
