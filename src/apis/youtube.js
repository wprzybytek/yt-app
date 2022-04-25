const KEY = "AIzaSyBiGDh7FP4jOsMdjcNaeDh6Xs7ZOHinr88";

export async function fetchVideos(text) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}&maxResults=10&type=video&key=${KEY}`
  );
  const data = await res.json();
  return data;
}

export async function fetchPage(pageToken, text) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}&maxResults=10&type=video&key=${KEY}&pageToken=${pageToken}`
  );
  const data = await res.json();
  return data;
}

export async function fetchVideo(id) {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=${KEY}`
  );
  const data = await res.json();
  return data;
}

export default { fetchVideos, fetchPage, fetchVideo };
