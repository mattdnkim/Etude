'use client';

import Card from '@/components/card';

export default function AboutPage() {
    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl mb-6">About Etude</h1>
            <p className="mb-4">
                Welcome to Etude, a home for classical music lovers.
            </p>
            <p className="mb-4">
                I created this station as a way to share the timeless beauty of classical music with anyone who needs a moment of calm, focus, or inspiration. Whether you are working, studying, or just slowing down after a long day, I hope the music here brings you what you are looking for.
            </p>
            <p className="mb-4">
                When I am not curating music, you will probably find me scaling a rock wall or running along a quiet trail—both places where I feel the same kind of peace and presence that great music brings.
            </p>
            <p className="mb-4">
                Thanks for stopping by. Stay awhile, and enjoy the music.
            </p>
            <p className="mb-4">
                --- 김나 사랑해 ---
            </p>
            <p>
                Contact: <a href="mailto:mattdnkim@gmail.com" className="text-blue-400 hover:text-blue-300">mattdnkim@gmail.com</a>
            </p>
        </div>
    );
} 