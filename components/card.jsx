'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Card({ title, description, image, onClick, isSelected, showImage = false }) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <div
            className={`flex flex-col w-full bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 cursor-pointer group ${isSelected ? 'ring-2 ring-primary' : ''
                }`}
            onClick={onClick}
        >
            {image && (
                <div className={`relative aspect-video rounded-t-lg overflow-hidden ${showImage ? 'block' : 'hidden'
                    }`}>
                    {isImageLoading && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${isImageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        loading="lazy"
                        onLoadingComplete={() => setIsImageLoading(false)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{description}</p>
            </div>
        </div>
    );
}
