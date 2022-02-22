import { gql, GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {

  const pageSlug = pageContext.query.slug;

  const token = process.env.NEXT_PUBLIC_TOKEN;
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const query = gql`
    query($pageSlug: String!) {
      video(where: {
        slug: $pageSlug
      }){
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
 `;

  const variables = {
    pageSlug
  }

  const data = await graphQLClient.request(query, variables);

  const video = data.video;

  return {
    props: {
      video
    }
  }

}

const Video = ({ video }) => {

  const [watching, setWathching] = useState(false);

  return (
    <>
      {!watching && <img className='video-image' src={video.thumbnails.url} alt={video.title} />}
      {!watching && <div className='video-info'>
        <p>{video.tags.join(', ')}</p>
        <p>{video.description}</p>
        <Link href="/"><p>go back</p></Link>
        <button 
          className="video-overlay" 
          onClick={()=> watching ? setWathching(prevState => prevState = false) : setWathching(prevState => prevState = true)}
          >Play</button>
      </div>}
      {watching && <video width= "100%" height="100%" controls>
        <source src={video.mp4.url} type="video/mp4" />
      </video>}
      <div className="info-footer" onClick={()=> watching ? setWathching(false) : null}>
        
      </div>
    </>
  );
}

export default Video;