import FileUpload from './FileUpload.jsx';

export default function Main() {
    return (
        <main className="bg-zinc-800 min-h-screen flex flex-col items-center justify-start p-6 space-y-6">
            {/* First child component */}
            <div className="w-full max-w-3xl bg-zinc-700 p-6 rounded-lg shadow-md text-zinc-100">
                {/* You can put your second component here */}
                <FileUpload />
            </div>

            {/* Placeholder for second child component */}
            <div className="w-full max-w-3xl bg-zinc-700 p-6 rounded-lg shadow-md text-zinc-100">
                {/* You can put your second component here */}
                <p>Second component placeholder</p>
            </div>
        </main>
    );
}
