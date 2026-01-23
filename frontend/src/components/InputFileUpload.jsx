import {useState} from 'react';
import {styled} from '@mui/material/styles';
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

export default function InputFileUpload({fetchDocs}) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [sent, setSent] = useState(false);
    const [failed, setFailed] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setSent(false);
            setFailed(false);
        }
    };


    const handleSend = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);

        try {
            const response = await axios.post(
                `${API_URL}/upload-pdf`,
                formData,
                {
                    headers: {'Content-Type': 'multipart/form-data'},
                }
            );
            console.log('Upload successful:', response.data);
            setFile(null);
            setSent(true);
            fetchDocs()
        } catch (err) {
            console.error('Upload failed:', err);
            setFailed(true)
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <Button
                style={{backgroundColor: 'black'}}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon/>}
            >
                {file ? 'Change file' : 'Select PDF'}
                <VisuallyHiddenInput
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </Button>

            {file && (
                <div className="text-zinc-100 bg-zinc-700 px-4 py-2 rounded w-full max-w-md text-center">
                    Selected file: <strong>{file.name}</strong>
                </div>
            )}

            <Button
                style={{backgroundColor: 'green'}}
                variant="contained"
                startIcon={<SendIcon/>}
                onClick={handleSend}
                disabled={!file || uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            {sent && (
                <div className="mt-4 w-full max-w-md text-center rounded-lg
                    bg-green-600 text-white px-4 py-2
                    shadow-md animate-fade-in">
                    File successfully uploaded
                </div>
            )}
            {failed && (
                <div className="mt-4 w-full max-w-md text-center rounded-lg
            bg-red-600 text-white px-4 py-2
            shadow-md animate-fade-in">
                    Upload failed. Please try again.
                </div>
            )}
        </div>
    );
}
