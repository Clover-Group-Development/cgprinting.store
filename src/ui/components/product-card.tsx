interface ProductCardProps {
    title: string;
    price: number;
}

export default function ProductCard({ title, price }: ProductCardProps) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{price.toFixed(2)}</p>
        </div>
    );
}
