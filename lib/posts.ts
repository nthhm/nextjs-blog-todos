// サーバーサイドでnode-fetchを利用してエンドポイントから投稿を取得する関数
import fetch from "node-fetch";
import { PostType } from "../types/post";

export const getAllPostsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );

  const posts: PostType[] = (await res.json()) as PostType[];
  const filtered_posts: PostType[] = posts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return filtered_posts;
};

// idの一覧を取得するための関数
export const getAllPostsIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );

  const posts: PostType[] = (await res.json()) as PostType[];
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
};

// 特定のIDに対して記事を取得する関数
export const getPostData = async (id: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`
  );
  const post: PostType = (await res.json()) as PostType;

  return {
    post,
  };
};
