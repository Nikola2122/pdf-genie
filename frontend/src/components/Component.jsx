export default function Component({children}){
    return (
        <div className="w-full max-w-3xl bg-zinc-700 p-6 rounded-lg shadow-md text-zinc-100">
            {children && children}
        </div>
    )
}