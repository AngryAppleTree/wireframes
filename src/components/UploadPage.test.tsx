import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { UploadPage } from './UploadPage';
import { getAllowedExtensionsString } from '../config/fileTypes';

describe('UploadPage Component', () => {
    it('should not have any accessibility violations', async () => {
        const { container } = render(<UploadPage onUploadComplete={() => { }} onBack={() => { }} onCancel={() => { }} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders title and dynamic instructions derived from config', () => {
        render(<UploadPage onUploadComplete={() => { }} onBack={() => { }} onCancel={() => { }} />);

        // Check main heading
        expect(screen.getByRole('heading', {
            name: /Please upload an Audio or Video file/i
        })).toBeInTheDocument();

        // Check the dynamic subtext matches formatting containing the exact string
        expect(screen.getByText(/Drag & drop a file or click "Choose file" to browse your device/i)).toBeInTheDocument();

        const allowedExtensionsText = getAllowedExtensionsString();

        // Check the dynamic subtext matches formatting containing the exact string
        expect(screen.getByText((_content, element) => {
            const hasText = (node: Element) => node.textContent === `Supported formats: ${allowedExtensionsText}`;
            const nodeHasText = hasText(element as Element);
            const childrenDontHaveText = Array.from(element?.children || []).every(
                child => !hasText(child)
            );
            return nodeHasText && childrenDontHaveText;
        })).toBeInTheDocument();
    });

    it('renders a natively accessible file input', () => {
        render(<UploadPage onUploadComplete={() => { }} onBack={() => { }} onCancel={() => { }} />);

        const fileInput = screen.getByLabelText(/Select an audio or video file from your device/i);
        expect(fileInput).toBeInTheDocument();
        expect(fileInput).toHaveAttribute('type', 'file');

        const acceptAttribute = fileInput.getAttribute('accept');
        expect(acceptAttribute).toContain(getAllowedExtensionsString());
    });

    it('triggers onCancel when cancel is clicked', async () => {
        const handleCancel = vi.fn();
        render(<UploadPage onUploadComplete={() => { }} onBack={() => { }} onCancel={handleCancel} />);

        await userEvent.click(screen.getByRole('button', { name: /Cancel and go back/i }));
        expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    it('displays an error message when submitting without a file', async () => {
        const handleUploadComplete = vi.fn();
        render(<UploadPage onUploadComplete={handleUploadComplete} onBack={() => { }} onCancel={() => { }} />);

        await userEvent.click(screen.getByRole('button', { name: /Upload selected file/i }));

        expect(screen.getByText(/Error: No file selected. Please select a file before continuing./i)).toBeInTheDocument();
        expect(handleUploadComplete).not.toHaveBeenCalled();
    });
});
