import { gql, GraphQLClient } from 'graphql-request';
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


}


const Home = ({ videos }) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  console.log(videos)

  return (
    <>
      <div className='main-video'>
        <img src={randomVideo(videos).thumbnails.url} alt={randomVideo(videos).title} />
      </div>
      <div className="video-feed">
        <Section genre={'Thriller'} />
        <Section genre={'Pixar'} />
        <Section genre={'Marvel'} />
        <Section genre={'National Geographic'} />
        <Section genre={'Disney'} />
        <Section genre={'Classic'} />
        <Section genre={'Star Wars'} />
        <Section genre={'Star Wars'} />
        <Section genre={'Star Wars'} />
      </div>
    </>

  )
}

export default Home;