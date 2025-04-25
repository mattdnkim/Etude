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
    const iframeRef = useRef(null);

    // Reset state when track changes
    useEffect(() => {
        if (!track) return;

        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(track.duration || 0);
        setError(null);

        // Clean up previous iframe if it exists
        if (iframeRef.current) {
            iframeRef.current.remove();
            iframeRef.current = null;
        }

        // Create new iframe for YouTube video
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `https://www.youtube.com/embed/${track.id}?enablejsapi=1&origin=${window.location.origin}`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        document.body.appendChild(iframe);
        iframeRef.current = iframe;

        // Load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return () => {
            if (iframeRef.current) {
                iframeRef.current.remove();
                iframeRef.current = null;
            }
        };
    }, [track]);

    useEffect(() => {
        if (!window.YT) return;

        window.onYouTubeIframeAPIReady = () => {
            if (iframeRef.current) {
                const player = new window.YT.Player(iframeRef.current, {
                    events: {
                        'onReady': (event) => {
                            // Player is ready
                        },
                        'onStateChange': (event) => {
                            if (event.data === window.YT.PlayerState.ENDED) {
                                setIsPlaying(false);
                                setCurrentTime(0);
                                if (hasNext) {
                                    onNext();
                                }
                            } else if (event.data === window.YT.PlayerState.PLAYING) {
                                setIsPlaying(true);
                            } else if (event.data === window.YT.PlayerState.PAUSED) {
                                setIsPlaying(false);
                            }
                        }
                    }
                });
            }
        };
    }, [hasNext, onNext]);

    const handlePlayPause = () => {
        if (!iframeRef.current || !window.YT) return;

        const player = iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
                event: 'command',
                func: isPlaying ? 'pauseVideo' : 'playVideo',
                args: []
            }),
            '*'
        );
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);

        if (iframeRef.current && window.YT) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: 'setVolume',
                    args: [newVolume * 100]
                }),
                '*'
            );
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);

        if (iframeRef.current && window.YT) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: isMuted ? 'unMute' : 'mute',
                    args: []
                }),
                '*'
            );
        }
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
        </div>
    );
} 