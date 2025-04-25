'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/card';
import { AudioPlayer } from '@/components/audio-player';
import { searchClassicalMusic } from '@/utils/music';

const channels = [
    {
        id: 'baroque',
        title: 'Baroque Channel',
        description: 'Experience the elegance of Baroque music',
        image: '/images/baroque-pattern.jpg',
        searchQuery: 'rameau baroque'
    },
    {
        id: 'classical',
        title: 'Classical Channel',
        description: 'Discover the masterpieces of the Classical era',
        image: '/images/baroque-pattern.jpg',
        searchQuery: 'classical symphony'
    },
    {
        id: 'romantic',
        title: 'Romantic Channel',
        description: 'Immerse yourself in the passion of Romantic music',
        image: '/images/baroque-pattern.jpg',
        searchQuery: 'chopin schumann brahms romantic'
    },
    {
        id: 'modern',
        title: 'Modern Channel',
        description: 'Explore contemporary classical compositions',
        image: '/images/baroque-pattern.jpg',
        searchQuery: 'modern classical'
    }
];

// Cache for storing fetched tracks
const tracksCache = new Map();

export default function ChannelsPage() {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedChannel) {
            const fetchTracks = async () => {
                // Check cache first
                if (tracksCache.has(selectedChannel.id)) {
                    const cachedTracks = tracksCache.get(selectedChannel.id);
                    console.log('Cached tracks:', cachedTracks);
                    setTracks(cachedTracks);
                    return;
                }

                setIsLoading(true);
                try {
                    const results = await searchClassicalMusic(selectedChannel.searchQuery);
                    console.log('Fetched tracks:', results);
                    setTracks(results);
                    // Cache the results
                    tracksCache.set(selectedChannel.id, results);
                } catch (error) {
                    console.error('Error fetching tracks:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchTracks();
        } else {
            // Clear tracks when no channel is selected
            setTracks([]);
            setCurrentTrackIndex(0);
        }
    }, [selectedChannel]);

    const handleNextTrack = () => {
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        }
    };

    const handlePreviousTrack = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        }
    };

    const handleChannelClick = (channel) => {
        // Toggle the selected channel
        setSelectedChannel(selectedChannel?.id === channel.id ? null : channel);
    };

    const handleBackgroundClick = (e) => {
        // Only deselect if clicking the background (not a channel)
        if (e.target === e.currentTarget) {
            setSelectedChannel(null);
        }
    };

    return (
        <div
            className="flex flex-col min-h-0 cursor-pointer"
            onClick={handleBackgroundClick}
        >
            <div className={`grid gap-2 p-2 ${selectedChannel
                ? 'grid-cols-1 max-w-2xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                }`}>
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        className={`transition-all duration-300 ${selectedChannel && selectedChannel.id !== channel.id ? 'hidden' : ''
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleChannelClick(channel);
                        }}
                    >
                        <Card
                            title={channel.title}
                            description={channel.description}
                            image={channel.image}
                            isSelected={selectedChannel?.id === channel.id}
                            showImage={selectedChannel?.id === channel.id}
                        />
                    </div>
                ))}
            </div>
            {selectedChannel && (
                <div className="sticky bottom-0 left-0 right-0 bg-gray-900 p-2 z-50 min-h-[80px]">
                    {isLoading ? (
                        <div className="text-center text-white py-4">Loading tracks...</div>
                    ) : tracks.length > 0 ? (
                        <AudioPlayer
                            track={tracks[currentTrackIndex]}
                            onNext={handleNextTrack}
                            onPrevious={handlePreviousTrack}
                            hasNext={currentTrackIndex < tracks.length - 1}
                            hasPrevious={currentTrackIndex > 0}
                        />
                    ) : (
                        <div className="text-center text-white py-4">No tracks found</div>
                    )}
                </div>
            )}
        </div>
    );
} 