import Image from 'next/image';

export default function Card({ title, description, image, onClick, className = '' }) {
    return (
        <div
            className={`flex flex-col gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer group ${className}`}
            onClick={onClick}
        >
            {image && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    );
}
