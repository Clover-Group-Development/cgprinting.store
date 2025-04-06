export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="product-rating-bar h-1 bg-gray-200 rounded overflow-hidden">
            <div style={{ width: `${progress}%` }} className="h-1 bg-yellow-400"></div>
        </div>
    )
}