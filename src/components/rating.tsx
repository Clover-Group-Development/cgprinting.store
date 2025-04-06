export default async function Rating({ rating }: { rating: number }) {
    return (
        <div className="grid grid-cols-5 gap-x-1 text-yellow-400 text-xs leading-3.5">
            {[5, 4, 3, 2, 1].map(i => (
                <span key={i}>{i <= rating ? '★' : ''}</span>
            ))}
        </div>
    )
}