import React, { useState } from 'react';
import { Button } from './Button';
import './MetadataPage.css';

export interface Metadata {
  commissionerName: string;
  location: string;
  witnessName: string;
  interviewDate: string;
  caseRef: string;
}

interface MetadataPageProps {
  onSubmit: (metadata: Metadata) => void;
  onBack: () => void;
  onCancel: () => void;
}

export const MetadataPage: React.FC<MetadataPageProps> = ({ onSubmit, onBack, onCancel }) => {
  const rawLocations = [
    'Edinburgh',
    'Glasgow',
    'Inverness',
    'Aberdeen',
    'Dundee',
    'North Strathclyde',
    'South Strathclyde',
    'Remote evidence suite',
  ];

  // Dynamically sorts the dropdown options to ensure alphabetization
  const sortedLocations = [...rawLocations].sort((a, b) => a.localeCompare(b));

  const [formData, setFormData] = useState<Metadata>({
    commissionerName: '',
    location: '',
    witnessName: '',
    interviewDate: '',
    caseRef: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Metadata, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name as keyof Metadata]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof Metadata, string>> = {};
    if (!formData.commissionerName.trim())
      newErrors.commissionerName = 'Error: Please enter the commissioner name.';
    if (!formData.location.trim())
      newErrors.location = 'Error: Please select an interview location.';
    if (!formData.witnessName.trim())
      newErrors.witnessName = 'Error: Please enter the witness name.';
    if (!formData.interviewDate.trim())
      newErrors.interviewDate = 'Error: Please enter the interview date.';
    if (!formData.caseRef.trim()) newErrors.caseRef = 'Error: Please enter the case reference.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="metadata-page-container">
      <div className="back-link-container">
        <a
          href="#"
          className="back-link"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          &lt; Back
        </a>
      </div>

      <h1>Please provide information about this interview.</h1>

      <form className="metadata-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="commissionerName">Commissioner name</label>
          <p className="metadata-input-subtext" id="commissionerName-hint">
            Enter the name of the commissioner who oversaw the witness interview
          </p>
          <input
            id="commissionerName"
            name="commissionerName"
            type="text"
            className={`form-control ${errors.commissionerName ? 'input-error' : ''}`}
            value={formData.commissionerName}
            onChange={handleChange}
            aria-describedby={`commissionerName-hint ${errors.commissionerName ? 'commissionerName-error' : ''}`}
          />
          {errors.commissionerName && (
            <div id="commissionerName-error" className="metadata-error-msg" role="alert">
              {errors.commissionerName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location">Interview location</label>
          <p className="metadata-input-subtext" id="location-hint">
            In which city did the interview take place
          </p>
          <select
            id="location"
            name="location"
            className={`form-control ${errors.location ? 'input-error' : ''}`}
            value={formData.location}
            onChange={handleChange}
            aria-describedby={`location-hint ${errors.location ? 'location-error' : ''}`}
          >
            <option value="" disabled>
              Select a location
            </option>
            {sortedLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {errors.location && (
            <div id="location-error" className="metadata-error-msg" role="alert">
              {errors.location}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="witnessName">Witness name</label>
          <p className="metadata-input-subtext" id="witnessName-hint">
            Enter the name of the witness
          </p>
          <input
            id="witnessName"
            name="witnessName"
            type="text"
            className={`form-control ${errors.witnessName ? 'input-error' : ''}`}
            value={formData.witnessName}
            onChange={handleChange}
            aria-describedby={`witnessName-hint ${errors.witnessName ? 'witnessName-error' : ''}`}
          />
          {errors.witnessName && (
            <div id="witnessName-error" className="metadata-error-msg" role="alert">
              {errors.witnessName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="interviewDate">Interview date</label>
          <p className="metadata-input-subtext" id="interviewDate-hint">
            Enter the date the interview.
          </p>
          <input
            id="interviewDate"
            name="interviewDate"
            type="date"
            className={`form-control ${errors.interviewDate ? 'input-error' : ''}`}
            value={formData.interviewDate}
            onChange={handleChange}
            aria-describedby={`interviewDate-hint ${errors.interviewDate ? 'interviewDate-error' : ''}`}
          />
          {errors.interviewDate && (
            <div id="interviewDate-error" className="metadata-error-msg" role="alert">
              {errors.interviewDate}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="caseRef">Case reference</label>
          <p className="metadata-input-subtext" id="caseRef-hint">
            Enter the case reference.
          </p>
          <input
            id="caseRef"
            name="caseRef"
            type="text"
            className={`form-control ${errors.caseRef ? 'input-error' : ''}`}
            value={formData.caseRef}
            onChange={handleChange}
            aria-describedby={`caseRef-hint ${errors.caseRef ? 'caseRef-error' : ''}`}
          />
          {errors.caseRef && (
            <div id="caseRef-error" className="metadata-error-msg" role="alert">
              {errors.caseRef}
            </div>
          )}
        </div>

        <div className="form-actions">
          <Button type="submit" aria-label="Submit metadata">
            Submit
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            aria-label="Cancel and go back"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
