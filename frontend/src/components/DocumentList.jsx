import axios from "axios";

export default function DocumentsList({documents, count, fetchDocs}) {

    const deleteDocument = async (source) => {
        try {
            const resp = await axios.post(`http://backend:8000/delete/`, {
                source: source,
            })
            console.log(resp)
            fetchDocs()
        } catch (err) {
            console.log(err)
        }
    }

    let docElements = documents.map((doc, index) => <li
            key={index}
            className="mb-3 p-2 bg-zinc-800 rounded hover:bg-zinc-600 transition-colors cursor-pointer flex items-center justify-between"
            style={{ listStyle: 'none' }}
        >
        <span className="truncate">
            {doc || `Document ${index + 1}`}
        </span>

            <button
                onClick={() => deleteDocument(doc)}
                className="
                cursor-pointer
                ml-4
                bg-red-600
                hover:bg-red-500
                text-white
                text-sm
                px-3
                py-1
                rounded
                transition-colors
                shadow
            "
            >
                Delete
            </button>
        </li>
    )

    return (
        <div className="w-full max-w-3xl bg-zinc-700 p-4 rounded-lg shadow-md text-zinc-100">
            <h2 className="text-xl font-semibold mb-2">Documents: {count}</h2>
            {documents.length === 0 ? (
                <p className="text-zinc-400">No documents found.</p>
            ) : (
                docElements
            )}
        </div>
    );
}
