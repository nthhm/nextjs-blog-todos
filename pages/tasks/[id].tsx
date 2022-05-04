import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";
import Layout from "../../components/Layout";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";
import { TaskType } from "../../types/task";

type Props = {
  staticTask: TaskType;
  id: string;
};

// ここで利用するfetch関数はクライアントサイドで実行するfetchなのでnode-fetchからimportしない
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Task: NextPage<Props> = ({ staticTask, id }) => {
  const router = useRouter();

  // useSWRでフェッチング;
  const { data: task, mutate }: SWRResponse<any, any> = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  // 新しいデータにアクセスしている場合、isFallbackがtrueになる
  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <p className="mb-4">
        {"ID : "}
        {task.id}
      </p>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page">
        <div className="flex cursor-pointer mt-8">
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
          <span>Back to task page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Task;

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const { task: staticTask } = await getTaskData(context.params?.id);
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
};
