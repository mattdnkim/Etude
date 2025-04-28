const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function searchClassicalMusic(query) {
    try {
        if (!YOUTUBE_API_KEY) {
            console.error('YouTube API key is missing');
            throw new Error('YouTube API key is not configured');
        }

        // Clean and format the search query
        const cleanQuery = query.trim().toLowerCase();

        // Common classical music terms to enhance search
        const classicalTerms = [
            'classical music',
            'orchestra',
            'symphony',
            'concerto',
            'sonata',
            'piano',
            'violin',
            'cello',
            'opera',
            'chamber music'
        ];

        // Construct search query with relevant terms
        const searchTerms = [
            cleanQuery,
            ...classicalTerms.filter(term => !cleanQuery.includes(term))
        ].join(' ');

        console.log('Searching with enhanced query:', searchTerms);
        const searchUrl = `${YOUTUBE_API_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchTerms)}&type=video&videoCategoryId=10&key=${YOUTUBE_API_KEY}`;
        console.log('Search API URL:', searchUrl);

        const searchResponse = await fetch(searchUrl);
        console.log('Search Response status:', searchResponse.status);
        console.log('Search Response headers:', Object.fromEntries(searchResponse.headers.entries()));

        if (!searchResponse.ok) {
            const errorText = await searchResponse.text();
            console.error('YouTube API Error Response:', errorText);
            throw new Error(`YouTube API error: ${searchResponse.status} - ${errorText}`);
        }

        const searchData = await searchResponse.json();
        console.log('Search API Response:', searchData);

        if (!searchData.items || searchData.items.length === 0) {
            console.log('No results found');
            return [];
        }

        // Filter out non-classical content based on title and description
        const filteredItems = searchData.items.filter(item => {
            const title = item.snippet.title.toLowerCase();
            const description = item.snippet.description.toLowerCase();

            // Keywords that might indicate non-classical content
            const nonClassicalKeywords = [
                'pop',
                'rock',
                'hip hop',
                'rap',
                'electronic',
                'dance',
                'remix',
                'cover',
                'karaoke',
                'tutorial'
            ];

            // Check if the item contains any non-classical keywords
            return !nonClassicalKeywords.some(keyword =>
                title.includes(keyword) || description.includes(keyword)
            );
        });

        if (filteredItems.length === 0) {
            console.log('No classical music results found after filtering');
            return [];
        }

        // Get video details for duration
        const videoIds = filteredItems.map(item => item.id.videoId).join(',');
        const detailsUrl = `${YOUTUBE_API_URL}/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
        console.log('Details API URL:', detailsUrl);

        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) {
            const errorText = await detailsResponse.text();
            console.error('YouTube Details API Error Response:', errorText);
            throw new Error(`YouTube Details API error: ${detailsResponse.status} - ${errorText}`);
        }

        const detailsData = await detailsResponse.json();
        console.log('Details API Response:', detailsData);

        const tracks = filteredItems.map((item, index) => {
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