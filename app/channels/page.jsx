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
        searchQuery: 'baroque classical'
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
        searchQuery: 'romantic classical'
    },
    {
        id: 'modern',
        title: 'Modern Channel',
        description: 'Explore contemporary classical compositions',
        image: '/images/baroque-pattern.jpg',
        searchQuery: 'modern classical'
    }
];

export default function ChannelsPage() {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    useEffect(() => {
        if (selectedChannel) {
            const fetchTracks = async () => {
                const results = await searchClassicalMusic(selectedChannel.searchQuery);
                setTracks(results);
                setCurrentTrackIndex(0);
            };
            fetchTracks();
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Classical Music Channels</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {channels.map((channel) => (
                    <Card
                        key={channel.id}
                        title={channel.title}
                        description={channel.description}
                        image={channel.image}
                        onClick={() => setSelectedChannel(channel)}
                        className={selectedChannel?.id === channel.id ? 'ring-2 ring-primary' : ''}
                    />
                ))}
            </div>

            {selectedChannel && tracks.length > 0 && (
                <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
                        <AudioPlayer
                            track={tracks[currentTrackIndex]}
                            onNext={handleNextTrack}
                            onPrevious={handlePreviousTrack}
                            hasNext={currentTrackIndex < tracks.length - 1}
                            hasPrevious={currentTrackIndex > 0}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">Playlist</h2>
                        <div className="space-y-2">
                            {tracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer ${index === currentTrackIndex
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-gray-100'
                                        }`}
                                    onClick={() => setCurrentTrackIndex(index)}
                                >
                                    <span className="w-8 text-sm">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{track.name}</h3>
                                        <p className="text-sm">{track.artist_name}</p>
                                    </div>
                                    <span className="text-sm">
                                        {Math.floor(track.duration / 60)}:
                                        {(track.duration % 60).toString().padStart(2, '0')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 