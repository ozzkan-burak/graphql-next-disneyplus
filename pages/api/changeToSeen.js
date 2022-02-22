import { GraphQLClient } from 'graphql-request';
import { parseBody } from 'next/dist/server/api-utils';

export default async ({ bdy }, res) => {
  const graphcms = new GraphQLClient(process.env.ENDPOINT, {
    headers: { "Aurhorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` }
  });

  await graphcms.request(`
  
      mutation($slug: String!) {
        updateVideo (where:
          { slug: $slug },
          data: {seen: true}
        )
        {
          id,
          title,
          seen
        }
      }
  
  `,
      {slug: body.slug}
  );

  await graphcms.request(
    `mutation publishVideo($slug: String){
      publishVideo(where: {slug: $slug}i to: PUBLISHED){
        slug
      }
    }`,
    { slug: body.slug }
  )

  res.status(201).json({ slug : body.slug})
}