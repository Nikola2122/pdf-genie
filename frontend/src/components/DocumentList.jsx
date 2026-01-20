export default function DocumentsList({ documents }) {

    let docElements = documents.map((doc, index) => <li
        key={index}
        className="p-2 bg-zinc-800 rounded hover:bg-zinc-600 transition-colors cursor-pointer"
    >
        {doc.name || `Document ${index + 1}`}
    </li>)

    return (
        <div className="w-full max-w-3xl bg-zinc-700 p-4 rounded-lg shadow-md text-zinc-100">
            <h2 className="text-xl font-semibold mb-2">Documents</h2>
            {documents.length === 0 ? (
                <p className="text-zinc-400">No documents found.</p>
            ) : (
                docElements
            )}
        </div>
    );
}
