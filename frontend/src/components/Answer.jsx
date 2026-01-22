export default function Answer({current}) {

    return (
        <div className="w-full flex justify-center mt-8">
            <div
                className="
                    w-full max-w-3xl
                    bg-zinc-700
                    p-6
                    rounded-lg
                    shadow-md
                    text-zinc-100
                    space-y-4
                "
            >
                {/* Question */}
                <div>
                    <p className="text-sm text-zinc-400">Question</p>
                    <p className="text-lg font-medium">
                        {current.question}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-600" />

                {/* Answer */}
                <div>
                    <p className="text-sm text-zinc-400">Answer</p>
                    <p className="text-base leading-relaxed whitespace-pre-line">
                        {current.answer}
                    </p>
                </div>

                {/* Sources */}
                {current.sources && current.sources.length > 0 && (
                    <>
                        <div className="h-px bg-zinc-600" />

                        <div>
                            <p className="text-sm text-zinc-400 mb-2">
                                Sources
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-green-400">
                                {current.sources.map((src, index) => (
                                    <li key={index}>
                                        {src}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
