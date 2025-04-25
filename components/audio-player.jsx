'use client';

import { useState, useRef, useEffect } from 'react';

export function AudioPlayer({ track, onNext, onPrevious, hasNext, hasPrevious }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    // Reset state and play when track changes
    useEffect(() => {
        if (!track) return;

        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setError(null);

        // Add a small delay to ensure the audio element is ready
        const timer = setTimeout(() => {
            if (audioRef.current) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch((error) => {
                            console.error('Error playing audio:', error);
                            setError('Error playing audio. Please try again.');
                        });
                }
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [track]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio) {
                setCurrentTime(audio.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            if (audio) {
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            if (hasNext) {
                onNext();
            }
        };

        const handleError = (e) => {
            console.error('Audio error:', e);
            setError('Error loading audio. Please try again.');
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [hasNext, onNext, track]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(!isPlaying);
                    })
                    .catch((error) => {
                        console.error('Error playing audio:', error);
                        setError('Error playing audio. Please try again.');
                    });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!track) return null;

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-900 rounded-lg shadow">
            {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
            )}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => {
                        onPrevious();
                    }}
                    disabled={!hasPrevious}
                    className="p-2 rounded-full text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={handlePlayPause}
                    className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </button>

                <button
                    onClick={() => {
                        onNext();
                    }}
                    disabled={!hasNext}
                    className="p-2 rounded-full text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div className="flex-1">
                    <h3 className="font-medium text-white">{track.title}</h3>
                    <p className="text-sm text-gray-300">{track.artist}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="p-1">
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H7a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h.586l4.707-4.707C10.923 11.663 12 12.109 12 13v2c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H7a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h.586l4.707-4.707C10.923 11.663 12 12.109 12 13v2c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24"
                    />
                </div>

                <div className="text-sm text-gray-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>

            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                />
            </div>

            <audio
                ref={audioRef}
                src={track.streamUrl}
                preload="metadata"
                crossOrigin="anonymous"
            />
        </div>
    );
} 