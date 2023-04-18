import Layout from '@/components/template/Layout';
import Date from '@/components/utility/Date';
import { getAllPostIds, getPostData } from '@/lib/posts';

export interface PostData {
  title: string;
  date: string;
  id: string;
  contentHtml: string;
  description: string;
  image: string;
  languages: Array<string>;
  frameworks: Array<string>;
  databases: Array<string>;
  platforms: Array<string>;
}

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      <Date dateString={postData.date} />
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
