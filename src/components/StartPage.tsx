import React from 'react';
import { Button } from './Button';
import './StartPage.css';

interface StartPageProps {
    onStart: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
    return (
        <div className="start-page-container">
            <h1>Use this service to obtain a transcript from a recording of an Evidence by Commission (EBC) procedure.</h1>

            <p className="start-page-description start-page-description-top">
                Evidence by Commission (EBC) is a legal procedure that allows a witness to provide their testimony outside of a traditional courtroom setting, typically recorded before a commissioner.
            </p>

            <p className="start-page-description start-page-description-bottom">
                To support the EBC process, Justiciary teams can now use an AI-powered digital transcription service. Using this service you can upload audio and video files from EBC hearings and generate transcripts in a fraction of the time required for manual typing. Note that this service is still at proof of concept stage.
            </p>

            <Button onClick={onStart} aria-label="Start the transcription upload service now">
                Start now
            </Button>
        </div>
    );
};
