import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import { PostType } from "../../types/post";

type Props = {
  post: PostType;
};

const Post: NextPage<Props> = ({ post }) => {
  const router = useRouter();

  // 新しいデータにアクセスしている場合、isFallbackがtrueになる
  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to blog page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = await getAllPostsIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const { post } = await getPostData(context.params?.id);
  return {
    props: {
      post,
    },
    revalidate: 3,
  };
};
