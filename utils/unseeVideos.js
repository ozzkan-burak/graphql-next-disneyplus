export const unseeVideos = (videos) => {
  return videos.filter(video => video.seen == false || video.seen == null);
}