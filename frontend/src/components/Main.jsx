import FileUpload from './FileUpload.jsx';
import Component from "./Component.jsx";
import QuestionZone from "./QuestionZone.jsx";

export default function Main() {
    return (
        <main className="bg-zinc-800 min-h-screen flex flex-col items-center justify-start p-6 space-y-6">
            <Component>
                <FileUpload />
            </Component>
            <Component>
                <QuestionZone />
            </Component>
        </main>
    );
}
