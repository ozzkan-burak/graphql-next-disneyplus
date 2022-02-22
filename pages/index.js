import { gql, GraphQLClient } from 'graphql-request';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import { filterVideos } from '../utils/filterVideos';
import { unseeVideos } from '../utils/unseeVideos';

export const getStaticProps = async () => {

  const token = process.env.NEXT_PUBLIC_TOKEN;
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const videosQuery = gql`
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


const accountQuery = gql `
  query {
    account(where: {id: "ckxgasbaw9fiv0c969okfh0sa" }){
      username
      avatar {url}
    }
  }
`;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    }
  }


};


const Home = ({ videos, account }) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  };

  return (
    <>
      <div className="app">
        <Navbar account={account} />
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