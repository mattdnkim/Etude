const JAMENDO_API_URL = 'https://api.jamendo.com/v3.0';
const JAMENDO_CLIENT_ID = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;

export async function searchClassicalMusic(query) {
    try {
        const response = await fetch(
            `${JAMENDO_API_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&tags=classical&search=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results.map((track) => ({
            id: track.id,
            title: track.name,
            artist: track.artist_name,
            artwork: track.image || '/images/default-artwork.jpg',
            streamUrl: track.audio,
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