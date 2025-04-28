'use client';

import { useState, useEffect } from 'react';
import { AudioPlayer } from '@/components/audio-player';
import { searchClassicalMusic } from '@/utils/music';

export default function HomePage() {
    const [track, setTrack] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRandomTrack = async () => {
            setIsLoading(true);
            try {
                // Search for a variety of classical music
                const results = await searchClassicalMusic('classical piano violin symphony');
                if (results && results.length > 0) {
                    // Select a random track
                    const randomIndex = Math.floor(Math.random() * results.length);
                    setTrack(results[randomIndex]);
                }
            } catch (error) {
                console.error('Error fetching random track:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRandomTrack();
    }, []);

    const handleNextTrack = async () => {
        setIsLoading(true);
        try {
            const results = await searchClassicalMusic('classical piano violin symphony');
            if (results && results.length > 0) {
                const randomIndex = Math.floor(Math.random() * results.length);
                setTrack(results[randomIndex]);
            }
        } catch (error) {
            console.error('Error fetching next track:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4">
            <div className="max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Welcome to Etude
                </h1>
                <p className="text-gray-300 text-center mb-8">
                    Discover beautiful classical music. Click the play button to start.
                </p>
                {isLoading ? (
                    <div className="text-center text-white py-4">Loading music...</div>
                ) : track ? (
                    <div className="bg-gray-900 rounded-lg p-4">
                        <AudioPlayer
                            track={track}
                            onNext={handleNextTrack}
                            onPrevious={handleNextTrack}
                            hasNext={true}
                            hasPrevious={true}
                        />
                    </div>
                ) : (
                    <div className="text-center text-white py-4">No music found</div>
                )}
            </div>
        </div>
    );
}
