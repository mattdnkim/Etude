import Card from '@/components/card';

const playlists = [
    {
        id: 'morning',
        title: 'Morning Classics',
        description: 'Start your day with uplifting classical pieces',
        duration: '2h 30m',
        tracks: 15,
        image: '/images/morning-classics.jpg'
    },
    {
        id: 'study',
        title: 'Study Focus',
        description: 'Perfect background music for concentration',
        duration: '3h 45m',
        tracks: 20,
        image: '/images/study-focus.jpg'
    },
    {
        id: 'relax',
        title: 'Relaxation',
        description: 'Calming classical pieces for relaxation',
        duration: '2h 15m',
        tracks: 12,
        image: '/images/relaxation.jpg'
    },
    {
        id: 'masterpieces',
        title: 'Timeless Masterpieces',
        description: 'Essential classical works everyone should know',
        duration: '4h 20m',
        tracks: 25,
        image: '/images/masterpieces.jpg'
    }
];

export default function PlaylistsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Curated Playlists</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {playlists.map((playlist) => (
                    <Card
                        key={playlist.id}
                        title={playlist.title}
                        description={playlist.description}
                        image={playlist.image}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                    />
                ))}
            </div>
        </div>
    );
} 