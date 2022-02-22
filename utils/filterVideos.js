export  const filterVideos = (videos, genre) => {
  return videos.filter(video => video.tags.includes(genre))
};