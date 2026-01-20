import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Handle file selection (only one file)
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // only one file
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Send file to backend
    const handleSend = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);

        try {
            const response = await axios.post(
                'http://localhost:8000/upload-pdf', // replace with your backend URL
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            console.log('Upload successful:', response.data);
            alert(`Upload complete! ${file.name} processed.`);

            // Clear selected file
            setFile(null);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* File select button */}
            <Button
                style={{ backgroundColor: 'black' }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                {file ? 'Change file' : 'Select PDF'}
                <VisuallyHiddenInput
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </Button>

            {/* Show selected file */}
            {file && (
                <div className="text-zinc-100 bg-zinc-700 px-4 py-2 rounded w-full max-w-md text-center">
                    Selected file: <strong>{file.name}</strong>
                </div>
            )}

            {/* Send button */}
            <Button
                style={{ backgroundColor: 'green' }}
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSend}
                disabled={!file || uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </Button>
        </div>
    );
}
