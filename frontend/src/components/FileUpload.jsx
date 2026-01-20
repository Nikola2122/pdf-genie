import { useEffect, useState } from 'react';
import InputFileUpload from './InputFileUpload.jsx';
import DocumentsList from "./DocumentList.jsx";

export default function FileUpload() {
    const [documents, setDocuments] = useState([]);
    const [changed, setChanged] = useState(false);

    async function fetchDocuments() {
        try {
            const res = await fetch('https://example.com/api/documents');
            const data = await res.json();
            setDocuments(data);
        } catch (err) {
            console.error('Failed to fetch documents:', err);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, [changed]);

    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full">
            {/* Document list component */}
            <DocumentsList documents={documents} />

            {/* File upload component */}
            <InputFileUpload emmiter={setChanged} />
        </div>
    );
}
