import {useState} from "react";
import axios from "axios";
import Answer from "./Answer.jsx";
import LoadingAnswer from "./LoadingAnswer.jsx";

export default function QuestionZone() {
    const [question, setQuestion] = useState('');
    const [topK, setTopK] = useState(2);
    const [current, setCurrent] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tmp = question
        setQuestion('')
        setLoading(true)

        try {
            const response = await axios.post(
                'http://localhost:8000/query',
                {query: question, top_k: topK},
                {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            console.log(response.data)
            setCurrent({'answer': response.data.answer, 'sources': response.data.sources, 'question': tmp})
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }


    return (
        <div>
            {loading && <LoadingAnswer />}
            {current && !loading &&
            (<Answer current={current} />)
            }
            <div className="w-full flex justify-center mt-8">
                <form
                    onSubmit={handleSubmit}
                    className="
                    w-full max-w-3xl
                    bg-zinc-700
                    p-6
                    rounded-lg
                    shadow-md
                    flex
                    flex-col
                    gap-4
                "
                >
                    {/* Question input */}
                    <input
                        required
                        placeholder="Ask a question about your documents..."
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="
                        w-full
                        bg-zinc-800
                        text-zinc-100
                        placeholder-zinc-400
                        px-4
                        py-3
                        rounded-md
                        border
                        border-zinc-600
                        focus:outline-none
                        focus:ring-2
                        focus:ring-green-500
                        focus:border-green-500
                    "
                    />

                    {/* Top K + Button row */}
                    <div className="flex items-center gap-4">
                        <input
                            required
                            type="number"
                            min={1}
                            value={topK}
                            onChange={(e) => setTopK(parseInt(e.target.value) || 1)}
                            className="
                            w-24
                            bg-zinc-800
                            text-zinc-100
                            px-3
                            py-2
                            rounded-md
                            border
                            border-zinc-600
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-500
                        "
                        /> <b>Number of chunks for retrieval </b>

                        <button
                            type="submit"
                            className="
                            ml-auto
                            bg-green-600
                            hover:bg-green-500
                            text-white
                            px-6
                            py-2
                            rounded-md
                            font-medium
                            transition-colors
                            shadow
                        "
                        >
                            Ask
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}