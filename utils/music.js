const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function searchClassicalMusic(query) {
    try {
        console.log('Searching with YouTube API key:', YOUTUBE_API_KEY);
        const searchUrl = `${YOUTUBE_API_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(query + ' classical music')}&type=video&key=${YOUTUBE_API_KEY}`;
        console.log('Search API URL:', searchUrl);

        const searchResponse = await fetch(searchUrl);
        console.log('Search Response status:', searchResponse.status);

        if (!searchResponse.ok) {
            throw new Error(`HTTP error! status: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        console.log('Search API Response:', searchData);

        if (!searchData.items || searchData.items.length === 0) {
            console.log('No results found');
            return [];
        }

        // Get video details for duration
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');
        const detailsUrl = `${YOUTUBE_API_URL}/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        const tracks = searchData.items.map((item, index) => {
            const duration = detailsData.items[index]?.contentDetails?.duration || 'PT0S';
            return {
                id: item.id.videoId,
                title: item.snippet.title,
                artist: item.snippet.channelTitle,
                artwork: item.snippet.thumbnails.medium?.url || '/images/default-artwork.jpg',
                streamUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                duration: formatDuration(duration)
            };
        });

        console.log('Processed tracks:', tracks);
        return tracks;
    } catch (error) {
        console.error('Error searching for music:', error);
        return [];
    }
}

function formatDuration(duration) {
    // Convert YouTube duration format (PT1H2M3S) to seconds
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = (parseInt(match[1]) || 0) * 3600;
    const minutes = (parseInt(match[2]) || 0) * 60;
    const seconds = parseInt(match[3]) || 0;
    return hours + minutes + seconds;
}

export async function getTrackById(trackId) {
    try {
        const response = await fetch(
            `${DEEZER_API_URL}/track/${trackId}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching track:', error);
        return null;
    }
} 