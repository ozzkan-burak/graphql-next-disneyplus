import { gql, GraphQLClient } from 'graphql-request';

export const getServerSideProps = async (pageContext) => {

  const pageSlug =  pageContext.query.slug;

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

const Video = ({video}) => {

  console.log(video)

  return (
    <div>
      <h1>Video</h1>
    </div>
  );
}

export default Video;