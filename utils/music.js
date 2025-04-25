const JAMENDO_API_URL = 'https://api.jamendo.com/v3.0';
const JAMENDO_CLIENT_ID = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;
const SOUNDCLOUD_CLIENT_ID = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;

export async function searchClassicalMusic(query) {
    try {
        const response = await fetch(
            `https://api.soundcloud.com/tracks?q=${encodeURIComponent(
                query
            )}&client_id=${SOUNDCLOUD_CLIENT_ID}&limit=10`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.map((track) => ({
            id: track.id,
            title: track.title,
            artist: track.user?.username || 'Unknown Artist',
            artwork: track.artwork_url || '/images/default-artwork.jpg',
            streamUrl: `${track.stream_url}?client_id=${SOUNDCLOUD_CLIENT_ID}`,
        }));
    } catch (error) {
        console.error('Error searching for music:', error);
        return [];
    }
}

export async function getTrackById(trackId) {
    try {
        const response = await fetch(
            `${JAMENDO_API_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&id=${trackId}`
        );
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error('Error fetching track:', error);
        return null;
    }
} 