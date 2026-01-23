import { useEffect, useState } from 'react';
import InputFileUpload from './InputFileUpload.jsx';
import DocumentsList from "./DocumentList.jsx";
import axios from "axios";

export default function FileUpload() {
    const [documents, setDocuments] = useState([]);
    const [count, setCount] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL

    async function fetchDocuments() {
        try {
            const res = await axios.get(`${API_URL}/documents`);
            const data = res.data
            setDocuments(data.documents);
            setCount(data.count);
            console.log(data);

        } catch (err) {
            console.error('Failed to fetch documents:', err);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full">
            <DocumentsList fetchDocs={fetchDocuments} documents={documents} count={count} />

            <InputFileUpload fetchDocs={fetchDocuments} />
        </div>
    );
}
