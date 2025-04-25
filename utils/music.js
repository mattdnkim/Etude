const JAMENDO_API_URL = 'https://api.jamendo.com/v3.0';
const JAMENDO_CLIENT_ID = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;

export async function searchClassicalMusic(query) {
    try {
        const response = await fetch(
            `${JAMENDO_API_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&tags=classical&search=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching music:', error);
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