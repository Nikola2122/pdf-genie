export default function Header() {
    return (
        <header className="w-full bg-zinc-900 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-center">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-2xl">P</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100 tracking-wide">
                            PDF<span className="text-emerald-400">-GENIE</span>
                        </h1>
                        <p className="text-sm md:text-base text-zinc-400 mt-1">
                            Simple RAG Application
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
