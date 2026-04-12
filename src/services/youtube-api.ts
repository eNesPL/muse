import { YouTube, UniversalCache } from 'youtubei.js';

// Initialize the client lazily
let yt: YouTube;

function getClient() {
  if (!yt) {
    yt = new YouTube(new UniversalCache());
  }
  return yt;
}

// Maintain backward compatibility with SongMetadata interface
interface SongMetadata {
  // Existing properties...
  title: string;
  artist: string;
  // Define additional properties as needed
}

// Function to search videos
async function search(query: string): Promise<SongMetadata[]> {
  const client = getClient();
  const results = await client.search(query);
  return results.map(video => ({
    title: video.title,
    artist: video.author.name,
    // Extract other relevant metadata...
  }));
}

// Function to get video information
async function getVideoInfo(videoId: string): Promise<SongMetadata> {
  const client = getClient();
  const info = await client.getInfo(videoId);
  return {
    title: info.title,
    artist: info.author.name,
    // Extract other relevant metadata...
  };
}

// Function to get playlist information
async function getPlaylist(id: string) {
  const client = getClient();
  return await client.getPlaylist(id);
}

// Preserve chapter splitting functionality from descriptions
function extractChapters(description: string): string[] {
  // Logic to extract chapters from the description...
  return [];
}