import Layout from "../components/Layout";
import Link from "next/link";
import { getAllPostsData } from "../lib/posts";
import { NextPage } from "next";
import { PostType } from "../types/post";
import { Post } from "../components/Post";

type Props = {
  posts: PostType[];
};

const BlogPage: NextPage<Props> = ({ posts }) => {
  return (
    <Layout title="Blog Page">
      <ul>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
      <Link href="/main-page">
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
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const posts = await getAllPostsData();

  return {
    props: { posts },
    revalidate: 3,
  };
};
