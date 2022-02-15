import { gql, GraphQLClient } from 'graphql-request';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

export const getStaticProps = async () => {

  const token = process.env.NEXT_PUBLIC_TOKEN;
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const query = gql`
query {
  videos {
    createdAt,
    id,
    title,
    description,
    seen,
    slug,
    tags,
    thumbnails {
      url
    },
    mp4 {
      url
    }
  }
}
`

  const data = await graphQLClient.request(query);

  const videos = data.videos;

  return {
    props: {
      videos,
    }
  }


};


const Home = ({ videos }) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  };

  const filterVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre))
  };

  const unseeVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null);
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <div className='main-video'>
          <img src={randomVideo(videos).thumbnails.url} alt={randomVideo(videos).title} />
        </div>
        <div className="video-feeds">
          <Section genre={'Recommended for you'} videos={unseeVideos(videos)}/>
          <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
          <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')} />
          <Section genre={'Pixar'} videos={filterVideos(videos, 'pixar')} />
          <Section genre={'Marvel'} videos={filterVideos(videos, 'marvel')} />
          <Section genre={'National Geographic'} videos={filterVideos(videos, 'national-geographic')} />
          <Section genre={'Disney'} videos={filterVideos(videos, 'disney')} />
          <Section genre={'Classic'} videos={filterVideos(videos, 'classic')} />
          <Section genre={'Star Wars'} videos={filterVideos(videos, 'star-wars')} />
        </div>
      </div>
    </>

  )
}

export default Home;