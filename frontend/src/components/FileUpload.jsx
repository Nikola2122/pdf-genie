import { useEffect, useState } from 'react';
import InputFileUpload from './InputFileUpload.jsx';
import DocumentsList from "./DocumentList.jsx";

export default function FileUpload() {
    const [documents, setDocuments] = useState([]);
    const [changed, setChanged] = useState(false);
    const [count, setCount] = useState(0);

    async function fetchDocuments() {
        try {
            const res = await fetch('http://localhost:8000/documents');
            const data = await res.json();
            setDocuments(data.documents);
            setCount(data.count);
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
            <DocumentsList documents={documents} count={count} />

            {/* File upload component */}
            <InputFileUpload changer={setChanged} />
        </div>
    );
}
