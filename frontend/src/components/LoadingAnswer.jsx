export default function LoadingAnswer() {
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
                    animate-pulse
                "
            >
                <div>
                    <div className="h-3 w-20 bg-zinc-600 rounded mb-2" />
                    <div className="h-5 w-3/4 bg-zinc-600 rounded" />
                </div>

                <div className="h-px bg-zinc-600" />

                <div className="space-y-2">
                    <div className="h-3 w-16 bg-zinc-600 rounded" />
                    <div className="h-4 w-full bg-zinc-600 rounded" />
                    <div className="h-4 w-11/12 bg-zinc-600 rounded" />
                    <div className="h-4 w-10/12 bg-zinc-600 rounded" />
                </div>

                <div className="space-y-2 pt-2">
                    <div className="h-3 w-20 bg-zinc-600 rounded" />
                    <div className="h-3 w-1/3 bg-zinc-600 rounded" />
                    <div className="h-3 w-1/4 bg-zinc-600 rounded" />
                </div>
            </div>
        </div>
    );
}
