import Card from './Card';


const Section = ({ genre, videos }) => {


  return (
    <section>
      <h3>{genre}</h3>
      <div className="video-feed">
        {videos && videos.map(video => (
          <a key={video.id} href={`/video/${video.slug}`}>
            <Card key={video.id} thumbnail={video.thumbnails.url} />
          </a>
        ))
        }
      </div>
    </section>
  )
};

export default Section;
