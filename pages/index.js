import { gql, GraphQLClient } from 'graphql-request';

export const getStaticProps = async () => {

  const token = process.env.NEXT_PUBLIC_TOKEN;
  const url = process.envENDPOINT;

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


const Home = ({videos}) => {

  console.log(videos)

  return (
    <div className=''>
      Hello World
    </div>
  )
}

export default Home;